import { commands } from 'vscode';
import { api } from '../api/rocket-api';

import { loginError, showErrorMessage } from '../ui/helpers';
import { channelController } from '../channels/channel-controller';
import { config } from '../config';
import Output from '../output-channel';

export const authLogin = commands.registerCommand('rocketCode.auth.login', async () => {
  try {
    await api.auth.login(config.username, config.password);
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

export const authLogout = commands.registerCommand('rocketCode.auth.logout', async () => {
  try {
    await api.auth.logout();
    Output.log(`You logged out of Rocket.Chat`);
    channelController.updateStatusBar();
  } catch (e) {
    showErrorMessage(e);
  }
});

export default {
  authLogin,
  authLogout,
};
