import { window, commands, QuickPickItem, QuickPickOptions } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { api } from '../api/rocket-api';
import Output from '../output-channel';
import { config } from '../config';
import { channelController } from '../channels/channel-controller';

export const select = commands.registerCommand('rocketCode.rooms.select', async () => {
  try {

    const roomTypes: QuickPickItem[] = [
      { label: 'channels', description: 'Public channels' },
      { label: 'groups', description: 'Private groups' },
      { label: 'ims', description: 'Private conversations' },
    ];
    const options: QuickPickOptions = {
      ignoreFocusOut: true,
      matchOnDescription: true,
      matchOnDetail: true,
    };
    const roomType = await window.showQuickPick(roomTypes, options);

    if (!!roomType) {
      let result;
      switch (roomType.label) {
        case 'channels':
          result = await api.channels.listJoined();
          break;
        case 'groups':
          result = await api.groups.list();
          break;
        case 'ims':
          result = await api.im.list();
          break;
      }
      const itemName = item => {
        if (!!item.name) {
          return item.name;
        } else {
          return item.usernames.filter(n => n !== config.username).join(', ');
        }
      };
      const items: QuickPickItem[] = result[roomType.label].map(item => {
        return {
          label: itemName(item),
          description: item.topic || null,
        };
      });
      const options: QuickPickOptions = {
        ignoreFocusOut: true,
        matchOnDescription: true,
        placeHolder: channelController.getChannelName(),
      };
      const picked: QuickPickItem = await window.showQuickPick(items, options);
      if (!!picked) {
        const selectedChannel = result[roomType.label].find(c => {
          if (c.name) {
            return c.name === picked.label;
          } else {
            return c.usernames.indexOf(picked.label) > -1;
          }
        });
        if (!!selectedChannel) {
          channelController.setChannel(selectedChannel);
          Output.log(`Switched to ${channelController.getChannelName()}`);
        }
      }
    }

  } catch (e) {
    showErrorMessage(e);
  }
});

export const rooms = {
  select,
};
