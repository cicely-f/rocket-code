import { window, workspace, commands, QuickPickItem, QuickPickOptions, ViewColumn, Uri } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { api } from '../api/rocket-api';
import Output from '../output-channel';
import { config } from '../config';
import { channelController } from '../channels/channel-controller';
import { roomContents } from '../channels/room-content-provider';

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
          const roomName = channelController.getChannelName();
          const previewUri = Uri.parse(`rocket-room://authority/rocket-room`);
          roomContents.update(previewUri);
          Output.log(`Switched to ${roomName}`);
        }
      }
    }

  } catch (e) {
    showErrorMessage(e);
  }
});

export const registration = workspace.registerTextDocumentContentProvider('rocket-room', roomContents);

export const view = commands.registerCommand('rocketCode.rooms.view', async () => {
  try {
    const roomName = channelController.getChannelName();
    const previewUri = Uri.parse(`rocket-room://authority/rocket-room`);
    const updateInterval = 1000; // update room every second
    const periodicUpdate = setInterval(() => {
      roomContents.update(previewUri);
    }, updateInterval);

    roomContents.update(previewUri);

    await commands.executeCommand('vscode.previewHtml', previewUri, ViewColumn.Two, 'Rocket.Code Room View');
    const roomDocument = workspace.textDocuments.find(d => d.fileName === '\\rocket-room');
    workspace.onDidCloseTextDocument(e => {
      if (e === roomDocument) {
        clearInterval(periodicUpdate);
      }
    });
  } catch (e) {
    showErrorMessage(e);
  }
});

export const rooms = {
  select,
  view,
  registration,
};
