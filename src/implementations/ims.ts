import { window, commands, QuickPickItem, QuickPickOptions } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { api } from '../api/rocket-api';
import Output from '../output-channel';
import { config } from '../config';
import { channelController } from '../channels/channel-controller';

export const imsList = commands.registerCommand('rocketCode.ims.list', async () => {
  try {
    const result = await api.im.list();
    const list = `You have joined the following conversations:\n${result.ims.map(im => im.usernames.filter(n => n !== config.username)).sort().join('\n')}`;
    Output.log(list);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const imsSelect = commands.registerCommand('rocketCode.ims.select', async () => {
  try {
    const result = await api.im.list();
    const items: QuickPickItem[] = result.ims.map(im => {
      return {
        label: im.usernames.filter(n => n !== config.username).join(', '),
        description: im.topic || null,
      };
    });
    const options: QuickPickOptions = {
      ignoreFocusOut: true,
      matchOnDescription: true,
      placeHolder: channelController.getChannelName(),
    };
    const picked = await window.showQuickPick(items, options);
    console.log('PICKED', picked);
    if (!!picked) {
      const selectedChannel = result.ims.find(c => c.usernames.indexOf(picked.label) > -1);
      if (!!selectedChannel) {
        channelController.setChannel(selectedChannel);
        Output.log(`Switched to @${channelController.getChannelName()}`);
      }
    }
  } catch (e) {
    showErrorMessage(e);
  }
});

export default {
  imsList,
  imsSelect,
};
