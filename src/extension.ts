'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands } from 'vscode';

import { api } from './api/rest';
import Output from './output-channel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    const { ROCKET_SERVER, ROCKET_USER, ROCKET_PASSWORD } = process.env;
    api.login(ROCKET_USER, ROCKET_PASSWORD)
        .then(data => Output.log(`Starting up Rocket.Code on '${ROCKET_SERVER}' for user '${ROCKET_USER}'`));
    console.log(`Starting up Rocket.Code on '${ROCKET_SERVER}' for user '${ROCKET_USER}'`);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const rcLogin = commands.registerCommand('rocketCode.login', () => {
        api.login(ROCKET_USER, ROCKET_PASSWORD)
            .then(data => console.log('Login:', data))
            .then(_ => api.me().then(data => console.log(data)));
    });

    context.subscriptions.push(rcLogin);
    const rcLogout = commands.registerCommand('rocketCode.logout', () => {
        api.logout().then(data => console.log('logout:', data));
    });
    context.subscriptions.push(rcLogout);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
