'use strict';
import { ExtensionContext, commands } from 'vscode';

// extension-specific imports
import { config } from './config';
import { api } from './api/rocket-api';
import Output from './output-channel';
import { channelController } from './channels/channel-controller';
import { showErrorMessage } from './ui/helpers';

import { misc } from './implementations/misc';
import { auth } from './implementations/auth';
import { users } from './implementations/users';
import { channels } from './implementations/channels';
import { groupsList /* groupsSelect */ } from './implementations/groups';
import { imsList, imsSelect } from './implementations/ims';

// this method is called when the extension is activated
export function activate(context: ExtensionContext) {

    Output.log('Rocket.Code starting up...');
    context.subscriptions.push(channelController);

    /*********************************************************************************************
     * FUNCTION IMPLEMENTATIONS
     *********************************************************************************************/

    // MISC
    context.subscriptions.push(misc.info);

    // AUTH
    for (const f in auth) { context.subscriptions.push(auth[f]); }

    // USERS
    for (const f in users) { context.subscriptions.push(users[f]); }

    // CHANNELS
    for (const f in channels) { context.subscriptions.push(users[f]); }

    // GROUPS
    context.subscriptions.push(groupsList);

    // IMS
    context.subscriptions.push(imsList);
    context.subscriptions.push(imsSelect);

    // CHAT

    /**
     * testMessage() - send a test message to the default channel TODO: remove this at some point, it's cruft.
     */

    const rcTestMessage = commands.registerCommand('rocketCode.testMessage', async () => {
        const testMessage = `Test message at ${new Date()}`;
        const channels = await api.channels.listJoined();
        const testChannel = channels.channels.find(c => c.name === config.defaultChannel);
        channelController.setChannel(testChannel);
        try {
            const result = await api.chat.postMessage({ roomId: testChannel._id, text: testMessage });
            console.log(result);
        } catch (e) {
            showErrorMessage(e);
        }
    });
    context.subscriptions.push(rcTestMessage);

    if (config.loginOnStartup) {
        commands.executeCommand('rocketCode.auth.login').then();
    }

}

// this method is called when the extension is deactivated
export function deactivate() {
}
