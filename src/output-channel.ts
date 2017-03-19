import { window, OutputChannel, Disposable } from 'vscode';

const time = () => {
  const now = new Date();
  const min = now.getMinutes();
  const minString = (min < 10) ? `0${min}` : `${min}`
  return `${now.getHours()}:${minString}:${now.getSeconds()}`;
};

class RocketCodeOutput {
  private _logChannel: OutputChannel;
  private _disposable: Disposable;

  constructor() {
    this._logChannel = window.createOutputChannel('Rocket.Code');
  }

  public log(message: string, messageType = 'Info') {
    this._logChannel.appendLine(`[ ${time()} ${messageType} ] ${message}`);
  }

  dispose() {
    this._disposable.dispose();
  }
}

const Output = new RocketCodeOutput
  ();

export default Output;
