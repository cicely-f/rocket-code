import { window, commands, InputBoxOptions } from 'vscode';
import { showErrorMessage } from '../ui/helpers';
import { api } from '../api/rocket-api';
import Output from '../output-channel';
// import { config } from '../config';
import { channelController } from '../channels/channel-controller';

export const postMessage = commands.registerCommand('rocketCode.chat.postMessage', async () => {
  try {
    const options: InputBoxOptions = {
      ignoreFocusOut: true,
      placeHolder: 'enter message text',

    };
    const channel = channelController.getChannel();
    if (channel) {
      const message = await window.showInputBox(options);
      if (!!message) {
        const result = await api.chat.postMessage({ roomId: channel._id, text: message });
        console.log(result);
        Output.log(`message sent to ${channelController.getChannelName()}`);
      }
    } else {
      window.showErrorMessage('You must select a channel, group or im first!');
    }
  } catch (e) {
    showErrorMessage(e);
  }
});

const fencedString = string => `\`\`\`
${string}
\`\`\``;

export const postSelection = commands.registerCommand('rocketCode.chat.postSelection', async () => {
  try {
    const editor = window.activeTextEditor;
    const selection = editor.selection;
    const start = editor.document.offsetAt(selection.start);
    const end = editor.document.offsetAt(selection.end);
    const selectedText = editor.document.getText().slice(start, end);
    if (selectedText.length > 0) {
      const channel = channelController.getChannel();
      if (channel) {
        const result = await api.chat.postMessage({ roomId: channel._id, text: fencedString(selectedText.split('\r\n').join('\n')) });
        Output.log(`selection sent to ${channelController.getChannelName()}`);
      } else {
        window.showErrorMessage('You must select a channel, group or im first!');
      }
    }
  } catch (e) {
    showErrorMessage(e);
  }
});

export const chat = {
  postMessage,
  postSelection,
};
