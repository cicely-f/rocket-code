import { commands } from 'vscode';
import { api } from '../api/rocket-api';

import { loginError, showErrorMessage } from '../ui/helpers';
import { channelController } from '../channels/channel-controller';
import { config } from '../config';
import Output from '../output-channel';

export const login = commands.registerCommand('rocketCode.auth.login', async () => {
  try {
    if (config.username && config.password) {
      await api.auth.login(config.username, config.password);
    } else if (config.userId && config.userKey) {
      await api.auth.loginWithKey(config.userId, config.userKey);
    } else {
      throw "You need to setup your credentials";
    }
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

export const logout = commands.registerCommand('rocketCode.auth.logout', async () => {
  try {
    await api.auth.logout();
    Output.log(`You logged out of Rocket.Chat`);
    channelController.updateStatusBar();
  } catch (e) {
    showErrorMessage(e);
  }
});

export const me = commands.registerCommand('rocketCode.auth.me', async () => {
  try {
    const result = await api.auth.me();
    console.log('ME', result);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const auth = {
  login,
  logout,
  me,
};
