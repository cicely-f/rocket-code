import { window, commands, QuickPickItem, QuickPickOptions } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { channels } from '../api/rocket-api';
import Output from '../output-channel';
import { channelController } from '../channels/channel-controller';

export const channelsListJoined = commands.registerCommand('rocketCode.channels.listJoined', async () => {
  try {
    const result = await channels.listJoined();
    const list = `You have joined the following channels:\n${result.channels.map(c => c.name).join('\n')}`;
    Output.log(list);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const channelsSelect = commands.registerCommand('rocketChat.selectChannel', async () => {
  try {
    const result = await channels.listJoined();
    const items: QuickPickItem[] = result.channels.map(c => {
      return {
        label: c.name,
        description: c.topic || null,
        details: c.description || null,
      };
    });
    const options: QuickPickOptions = {
      ignoreFocusOut: true,
      matchOnDescription: true,
      matchOnDetail: true,
      placeHolder: channelController.getChannelName(),
    };
    const picked = await window.showQuickPick(items, options);
    if (!!picked) {
      const selectedChannel = result.channels.find(c => c.name === picked.label);
      if (!!selectedChannel) {
        channelController.setChannel(selectedChannel);
        Output.log(`Switched to #${selectedChannel.name}`);
      }
    }
  } catch (e) {
    showErrorMessage(e);
  }
});

export default {
  channelsListJoined,
  channelsSelect,
};
