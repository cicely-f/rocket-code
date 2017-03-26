import { window, commands, InputBoxOptions } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { api } from '../api/rocket-api';
import Output from '../output-channel';

export const getPresence = commands.registerCommand('rocketCode.users.getPresence', async () => {
  try {
    const result = await api.users.getPresence();
    console.log('USERS.getPresence', result);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const info = commands.registerCommand('rocketCode.users.info', async () => {
  try {
    const me = await api.auth.me();
    const result = await api.users.info({ userId: me._id });
    console.log('USERS.info', result);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const list = commands.registerCommand('rocketCode.users.list', async () => {
  try {
    const result = await api.users.list();
    console.log('USERS.list', result);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const setAvatar = commands.registerCommand('rocketCode.users.setAvatar', async () => {
  try {
    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      placeHolder: 'e.g. http://lorempixel.com/250/250/cats/',
      prompt: 'Enter URL of avatar image',
    };
    const avatarUrl = await window.showInputBox(options);
    if (!!avatarUrl) {
      const result = await api.users.setAvatar({ avatarUrl });
      if (!!result.success) {
        Output.log(`Avatar set to ${avatarUrl}`);
      }
    }
  } catch (e) {
    showErrorMessage(e);
  }
});

export const users = {
  getPresence,
  info,
  list,
  setAvatar,
};
