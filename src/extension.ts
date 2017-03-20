'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, window, workspace } from 'vscode';

import { api } from './api/rocket-api';
import Output from './output-channel';

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

    const { ROCKET_SERVER, ROCKET_USER, ROCKET_PASSWORD } = process.env;

    // api.login(ROCKET_USER, ROCKET_PASSWORD)
    //     .then(_ => Output.log(`Logged in on '${ROCKET_SERVER}' as user '${ROCKET_USER}'`))
    //     .catch(loginError);

    const rcLogin = commands.registerCommand('rocketCode.login', async () => {
        try {
            await api.login(ROCKET_USER, ROCKET_PASSWORD);
            Output.log(`Logged in on '${ROCKET_SERVER}' as user '${ROCKET_USER}'`);
            const me = await api.me();
            console.log('me', me);
        }
        catch (e) {
            loginError(e);
        }
    });
    context.subscriptions.push(rcLogin);

    const rcLogout = commands.registerCommand('rocketCode.logout', async () => {
        try {
            await api.logout();
        } catch (e) {
            showErrorMessage(e);
        }

    });
    context.subscriptions.push(rcLogout);

    const rcTestMessage = commands.registerCommand('rocketCode.testMessage', async () => {
        const testMessage = `This is a test from within Visual Studio Code. Soon it should be possible to send something like this
\`\`\`
const result = await api.chat.postMessage(testChannel._id, testMessage);
console.log(result);
\`\`\`
        simply by selecting and right-clicking... ;)`;
        const channels = await api.channels.listJoined();
        const testChannel = channels.channels.find(c => c.name === 'andre-test');
        console.log('testChannel', testChannel);
        try {
            const result = await api.chat.postMessage(testChannel._id, testMessage);
            console.log(result);
        } catch (e) { showErrorMessage(e); console.log(e); }
    });
    context.subscriptions.push(rcTestMessage);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
