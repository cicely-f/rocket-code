import { commands } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { users } from '../api/rocket-api';
import Output from '../output-channel';

export const usersSetAvatar = commands.registerCommand('rocketCode.users.setAvatar', async () => {
  try {
    const avatarUrl = 'http://lorempixel.com/250/250/cats/';
    const result = await users.setAvatar({ avatarUrl });
    if (!!result.success) {
      Output.log(`Avatar set to ${avatarUrl}`);
    }
  } catch (e) {
    showErrorMessage(e);
  }
});

export default {
  usersSetAvatar,
};
