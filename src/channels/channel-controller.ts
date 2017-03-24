import { window, StatusBarItem, StatusBarAlignment } from 'vscode';
import { isLoggedIn } from '../api/rocket-api';
import { config } from '../config';

interface ChannelInterface {
  _id: string;
  name?: string;
  t: string;
  usernames: string[];
  msgs: number;
  u: {
    _id: string,
    username: string,
  };
  ts: string;
  ro: boolean;
  sysMes: boolean;
  _updatedAt: string;
}

class ChannelController {
  private _statusBarItem: StatusBarItem;
  private _currentChannel: ChannelInterface;

  public setChannel(channel) {
    console.log('setting channel', channel);
    this._currentChannel = channel;
    this.updateStatusBar();
  }

  public getChannel() {
    return this._currentChannel;
  }

  public getChannelName(): string {
    return this._currentChannel.name || this._currentChannel.usernames.filter(n => n !== config.username).join(', ');
  }

  public updateStatusBar() {
    if (!this._statusBarItem) {
      this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    }

    const loggedInText = `$(rocket) logged ${isLoggedIn() ? 'in' : 'out'}`;
    const prefix = (!!this._currentChannel && this._currentChannel.t === 'c') ? '#' : '@';
    const channelText = !!this._currentChannel ? `$(comment-discussion) ${prefix}${this._currentChannel.name}` : null;
    this._statusBarItem.text = `${loggedInText} ${channelText}`;
    this._statusBarItem.show();
  }
  dispose() {
    this._statusBarItem.dispose();
  }
}

export default ChannelController;
