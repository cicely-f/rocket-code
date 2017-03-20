'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, window, workspace, QuickPickOptions, QuickPickItem } from 'vscode';

import { api } from './api/rocket-api';
import Output from './output-channel';
import ChannelController from './channels/channel-controller';

const loginError = reason => window.showErrorMessage(`Error logging in. Please check your credentials.`);
const showErrorMessage = error => {
    window.showErrorMessage(`An Error occurred: ${JSON.stringify(error)}`);
    console.log('Rocket.Chat error:', error);
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    const config = workspace.getConfiguration('rocketCode');
    console.log(config);
    const channelController = new ChannelController();
    context.subscriptions.push(channelController);

    const { ROCKET_SERVER, ROCKET_USER, ROCKET_PASSWORD } = process.env;

    // api.login(ROCKET_USER, ROCKET_PASSWORD)
    //     .then(_ => Output.log(`Logged in on '${ROCKET_SERVER}' as user '${ROCKET_USER}'`))
    //     .catch(loginError);

    const rcLogin = commands.registerCommand('rocketCode.login', async () => {
        try {
            await api.login(ROCKET_USER, ROCKET_PASSWORD);
            Output.log(`Logged in on '${ROCKET_SERVER}' as user '${ROCKET_USER}'`);
            channelController.updateStatusBar();
            const me = await api.me();
            console.log('me', me);
            const channels = await api.channels.listJoined();
            const defaultChannel = channels.channels.find(c => c.name === config.channel);
            channelController.setChannel(defaultChannel);
        }
        catch (e) {
            loginError(e);
        }
    });
    context.subscriptions.push(rcLogin);

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

    const rcTestMessage = commands.registerCommand('rocketCode.testMessage', async () => {
        const testMessage = `Test message at ${new Date()}`;
        const channels = await api.channels.listJoined();
        const testChannel = channels.channels.find(c => c.name === config.channel);
        channelController.setChannel(testChannel);
        try {
            const result = await api.chat.postMessage(testChannel._id, testMessage);
            console.log(result);
        } catch (e) { showErrorMessage(e); console.log(e); }
    });
    context.subscriptions.push(rcTestMessage);

    const rcListJoinedChannels = commands.registerCommand('rocketCode.listJoinedChannels', async () => {
        const channels = await api.channels.listJoined();
        const list = `You have joined the following channels:\n${channels.channels.map(c => c.name).join('\n')}`;
        Output.log(list);
    });
    context.subscriptions.push(rcListJoinedChannels);

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

// this method is called when your extension is deactivated
export function deactivate() {
}
