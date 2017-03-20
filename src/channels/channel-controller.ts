import { window, StatusBarItem, StatusBarAlignment } from 'vscode';
import { isLoggedIn } from '../api/rocket-api';

class ChannelController {
  private _statusBarItem: StatusBarItem;

  public setChannel(name) { }

  public updateChannel() {
    if (!this._statusBarItem) {
      this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    }

    if (isLoggedIn()) {
      this._statusBarItem.text = '$(rocket) you are logged in';
    } else {
      this._statusBarItem.text = '$(rocket) you are not logged in';
    }
    this._statusBarItem.show();
  }
  dispose() {
    this._statusBarItem.dispose();
  }
}

export default ChannelController;
