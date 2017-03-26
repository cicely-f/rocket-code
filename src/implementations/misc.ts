import { commands } from 'vscode';
import { api } from '../api/rocket-api';

import { showErrorMessage } from '../ui/helpers';

export const miscInfo = commands.registerCommand('rocketCode.misc.info', async () => {
  try {
    const result = await api.misc.info();
    console.log('INFO', result);
  } catch (e) {
    showErrorMessage(e);
  }
});

export default {
  miscInfo,
};
