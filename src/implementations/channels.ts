import { window, commands, QuickPickItem, QuickPickOptions, InputBoxOptions } from 'vscode';

import { showErrorMessage } from '../ui/helpers';
import { api } from '../api/rocket-api';
import Output from '../output-channel';
import { channelController } from '../channels/channel-controller';

const R = require('ramda');

export const close = commands.registerCommand('rocketCode.channels.close', async () => {
  try {
    const roomId = channelController.getChannel()._id;
    await api.channels.close({ roomId });
    channelController.setChannel(null);
    Output.log(`Closed channel ${channelController.getChannelName()}`);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const create = commands.registerCommand('rocketCode.channels.create', async () => {
  try {
    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      placeHolder: 'channel name',
      prompt: 'Enter the name of the new channel',
    };
    const name = await window.showInputBox(options);
    if (!!name) {
      const result = await api.channels.create({ name });
      if (!!result.success) {
        channelController.setChannel(result.channel);
        Output.log(`Channel #${name} created and activated`);
      }
    }
  } catch (e) {
    showErrorMessage(e);
  }
});

export const history = commands.registerCommand('rocketCode.channels.history', async () => {
  try {
    const roomId = channelController.getChannel()._id;
    const result = await api.channels.history({ roomId });
    const messages = R.reverse(result.messages.filter(m => !!m.msg));
    const messageOutput = messages.map(m => `${m.u.username}: ${m.msg}`).join('\n');
    Output.log(`History for: ${channelController.getChannelName()}\n${messageOutput}`);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const info = commands.registerCommand('rocketCode.channels.info', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const invite = commands.registerCommand('rocketCode.channels.invite', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const leave = commands.registerCommand('rocketCode.channels.leave', async () => {
  try {
    const roomId = channelController.getChannel()._id;
    await api.channels.leave({ roomId });
    channelController.setChannel(null);
    Output.log(`Left channel ${channelController.getChannel()}`);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const listJoined = commands.registerCommand('rocketCode.channels.listJoined', async () => {
  try {
    const result = await api.channels.listJoined();
    const list = `You have joined the following channels:\n${result.channels.map(c => c.name).join('\n')}`;
    Output.log(list);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const list = commands.registerCommand('rocketCode.channels.list', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const open = commands.registerCommand('rocketCode.channels.open', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const rename = commands.registerCommand('rocketCode.channels.rename', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const setDescription = commands.registerCommand('rocketCode.channels.setDescription', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const setPurpose = commands.registerCommand('rocketCode.channels.setPurpose', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const setTopic = commands.registerCommand('rocketCode.channels.setTopic', async () => {
  try {
  } catch (e) {
    showErrorMessage(e);
  }
});

export const select = commands.registerCommand('rocketCode.channels.select', async () => {
  try {
    const result = await api.channels.listJoined();
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

export const channels = {
  close,
  create,
  history,
  info,
  invite,
  leave,
  listJoined,
  list,
  open,
  rename,
  setDescription,
  setPurpose,
  setTopic,
  select,
};
