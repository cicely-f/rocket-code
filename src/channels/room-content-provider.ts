import { EventEmitter, Event, Uri, TextDocumentContentProvider } from 'vscode';

import { channelController } from './channel-controller';
import { api } from '../api/rocket-api';
import { formatRoomContents } from './room-formatting';

const R = require('ramda');

export class RoomContentProvider implements TextDocumentContentProvider {
  private _onDidChange = new EventEmitter<Uri>();

  public async provideTextDocumentContent(uri: Uri): Promise<string> {
    return await this.createRoomView();
  }

  get onDidChange(): Event<Uri> {
    return this._onDidChange.event;
  }

  public update(uri: Uri) {
    this._onDidChange.fire(uri);
  }

  private async createRoomView(): Promise<string> {
    const room = channelController.getChannel();
    if (!room) {
      return this.errorContent(`You don't have a current room - please connect to one!`);
    }
    return this.roomContent(room);
  }

  private async roomContent(room): Promise<string> {
    try {
      const roomTypes = {
        c: 'channels',
        d: 'im',
        p: 'groups',
      };
      const messageSource = room => roomTypes[room.t];
      const roomName = channelController.getChannelName();
      const history = await api[messageSource(room)].history({ roomId: room._id });
      const messages = R.reverse(history.messages.filter(m => m));

      if (!roomName) {
        return this.errorContent("Cannot determine the rule's properties.");
      } else {
        return formatRoomContents(roomName, messages);
      }
    } catch (e) {
      return this.errorContent('Cannot get Room contents!');
    }
  }

  private errorContent(error: string): string {
    return `
				<body>
					${error}
				</body>`;
  }

  public dispose() {
  }
}

export const roomContents = new RoomContentProvider();

export default {
  RoomContentProvider,
  roomContents,
};
