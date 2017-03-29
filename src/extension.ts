'use strict';
import { ExtensionContext, commands } from 'vscode';

// extension-specific imports
import { config } from './config';
import Output from './output-channel';
import { channelController } from './channels/channel-controller';

import { misc } from './implementations/misc';
import { auth } from './implementations/auth';
import { users } from './implementations/users';
import { channels } from './implementations/channels';
import { groups } from './implementations/groups';
import { ims } from './implementations/ims';
import { rooms } from './implementations/rooms';
import { chat } from './implementations/chat';

// this method is called when the extension is activated
export function activate(context: ExtensionContext) {

    Output.log('Rocket.Code starting up...');
    context.subscriptions.push(channelController);

    /*********************************************************************************************
     * FUNCTION IMPLEMENTATIONS
     *********************************************************************************************/

    const registerCommands = commands => {
        for (const command in commands) { context.subscriptions.push(commands[command]); }
    };

    registerCommands(misc);
    registerCommands(auth);
    registerCommands(users);
    registerCommands(channels);
    registerCommands(groups);
    registerCommands(ims);
    registerCommands(rooms);
    registerCommands(chat);

    if (config.loginOnStartup) {
        commands.executeCommand('rocketCode.auth.login').then();
    }

}

// this method is called when the extension is deactivated
export function deactivate() {
}
