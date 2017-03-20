'use strict';
// "standard" imports, i.e. 'vscode', node_modules...
import { ExtensionContext, commands, window, QuickPickOptions, QuickPickItem } from 'vscode';

// extension-specific imports
import { config } from './config';
import { api } from './api/rocket-api';
import Output from './output-channel';
import ChannelController from './channels/channel-controller';

// temporary error message functions. TODO: make this into something more flexible and robust.
const loginError = reason => window.showErrorMessage(`Error logging in. Please check your credentials.`);

const showErrorMessage = error => {
    window.showErrorMessage(`An Error occurred: ${JSON.stringify(error)}`);
    console.log('Rocket.Chat error:', error);
};

// this method is called when the extension is activated
export function activate(context: ExtensionContext) {

    const channelController = new ChannelController();
    context.subscriptions.push(channelController);

    /*********************************************************************************************
     * FUNCTION IMPLEMENTATIONS
     *********************************************************************************************/

    /**
     * login(username, password) - login to the Rocket.Chat server
     */

    const rcLogin = commands.registerCommand('rocketCode.login', async () => {
        try {
            await api.login(config.username, config.password);
            Output.log(`Logged in on '${config.server}' as user '${config.username}'`);
            channelController.updateStatusBar();
            const channels = await api.channels.listJoined();
            const defaultChannel = channels.channels.find(c => c.name === config.defaultChannel);
            channelController.setChannel(defaultChannel);
        }
        catch (e) {
            loginError(e);
        }
    });
    context.subscriptions.push(rcLogin);

    /**
     * logout() - logout from server
     */

    const rcLogout = commands.registerCommand('rocketCode.logout', async () => {
        try {
            await api.logout();
            Output.log(`You logged out of Rocket.Chat`);
            channelController.updateStatusBar();
        } catch (e) {
            showErrorMessage(e);
        }

    });
    context.subscriptions.push(rcLogout);

    /**
     * testMessage() - send a test message to the default channel TODO: remove this at some point, it's cruft.
     */

    const rcTestMessage = commands.registerCommand('rocketCode.testMessage', async () => {
        const testMessage = `Test message at ${new Date()}`;
        const channels = await api.channels.listJoined();
        const testChannel = channels.channels.find(c => c.name === config.defaultChannel);
        channelController.setChannel(testChannel);
        try {
            const result = await api.chat.postMessage(testChannel._id, testMessage);
            console.log(result);
        } catch (e) { showErrorMessage(e); console.log(e); }
    });
    context.subscriptions.push(rcTestMessage);

    /**
     * listJoinedChannels() - log a list of joined channels to the console. probably useless and could be removed
     */

    const rcListJoinedChannels = commands.registerCommand('rocketCode.listJoinedChannels', async () => {
        const channels = await api.channels.listJoined();
        const list = `You have joined the following channels:\n${channels.channels.map(c => c.name).join('\n')}`;
        Output.log(list);
    });
    context.subscriptions.push(rcListJoinedChannels);

    /**
     * selectChannel() - changes the active chat channel. TODO: see how to support switching to @dm as well
     */

    const rcSelectChannel = commands.registerCommand('rocketChat.selectChannel', async () => {
        try {
            const result = await api.channels.listJoined();
            const items: QuickPickItem[] = result.channels.map(c => {
                return {
                    label: c.name,
                    description: c.topic || null,
                    details: c.description || null,
                };
            });
            const options: QuickPickOptions = {
                ignoreFocusOut: true,
                matchOnDescription: true,
                matchOnDetail: true,
                placeHolder: channelController.getChannel().name,
            };
            const picked = await window.showQuickPick(items, options);
            const selectedChannel = result.channels.find(c => c.name === picked.label);
            if (!!selectedChannel) {
                channelController.setChannel(selectedChannel);
                Output.log(`Switched to #${selectedChannel.name}`);
            }
        } catch (e) {
            showErrorMessage(e);
        }
    });
    context.subscriptions.push(rcSelectChannel);
}

// this method is called when the extension is deactivated
export function deactivate() {
}
