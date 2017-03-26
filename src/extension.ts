'use strict';
// "standard" imports, i.e. 'vscode', node_modules...
import { ExtensionContext, commands } from 'vscode';

// extension-specific imports
import { config } from './config';
import { api } from './api/rocket-api';
import Output from './output-channel';
import { channelController } from './channels/channel-controller';
import { showErrorMessage } from './ui/helpers';

import { authLogin, authLogout } from './implementations/auth';
import { miscInfo } from './implementations/misc';
import { channelsListJoined, channelsSelect } from './implementations/channels';
import { groupsList /* groupsSelect */ } from './implementations/groups';
import { imsList, imsSelect } from './implementations/ims';
import { usersSetAvatar } from './implementations/users';

// this method is called when the extension is activated
export function activate(context: ExtensionContext) {

    Output.log('Rocket.Code starting up...');
    context.subscriptions.push(channelController);

    /*********************************************************************************************
     * FUNCTION IMPLEMENTATIONS
     *********************************************************************************************/

    context.subscriptions.push(miscInfo);

    context.subscriptions.push(authLogin);
    context.subscriptions.push(authLogout);

    context.subscriptions.push(channelsListJoined);
    context.subscriptions.push(channelsSelect);

    context.subscriptions.push(groupsList);

    context.subscriptions.push(imsList);
    context.subscriptions.push(imsSelect);

    context.subscriptions.push(usersSetAvatar);

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
