import { window, OutputChannel, Disposable } from 'vscode';

// TODO: replace this shit with Moment or something better...
const time = () => {
  const now = new Date();
  const min = now.getMinutes();
  const minString = (min < 10) ? `0${min}` : `${min}`;
  const sec = now.getSeconds();
  const secString = (sec < 10) ? `0${sec}` : `${sec}`;
  return `${now.getHours()}:${minString}:${secString}`;
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

const Output = new RocketCodeOutput();

export default Output;
