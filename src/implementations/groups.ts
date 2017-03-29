import { commands } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { api } from '../api/rocket-api';
import Output from '../output-channel';
// import { channelController } from '../channels/channel-controller';

export const groupsList = commands.registerCommand('rocketCode.groups.list', async () => {
  try {
    const result = await api.groups.list();
    const list = `You have joined the following groups:\n${result.groups.map(c => c.name).join('\n')}`;
    Output.log(list);
  } catch (e) {
    showErrorMessage(e);
  }
});

export const groups = {
  groupsList,
};
