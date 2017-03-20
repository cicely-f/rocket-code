import { workspace } from 'vscode';

const configuration = workspace.getConfiguration('rocketCode');
const { ROCKET_SERVER, ROCKET_USER, ROCKET_PASSWORD } = process.env;

export const config = {
  server: configuration.serverUrl || ROCKET_SERVER,
  username: configuration.username || ROCKET_USER,
  password: configuration.password || ROCKET_PASSWORD,
  defaultChannel: configuration.channel || null,
};
