import { commands } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { groups } from '../api/rocket-api';
import Output from '../output-channel';
// import { channelController } from '../channels/channel-controller';

export const groupsList = commands.registerCommand('rocketCode.listGroups', async () => {
  try {
    const result = await groups.list();
    const list = `You have joined the following groups:\n${result.groups.map(c => c.name).join('\n')}`;
    Output.log(list);
  } catch (e) {
    showErrorMessage(e);
  }
});

export default {
  groupsList,
};
