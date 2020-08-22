import { workspace } from "vscode";

const configuration = workspace.getConfiguration("rocketCode");
const { ROCKET_SERVER, ROCKET_USER, ROCKET_PASSWORD, ROCKET_USER_ID, ROCKET_USER_KEY } = process.env;

interface IConfig {
  server: string;
  apiPath: string;
  username?: string;
  password?: string;
  userId?: string;
  userKey?: string;
  defaultChannel?: string;
  loginOnStartup?: boolean;
}

export const config: IConfig = {
  server: configuration.serverUrl || ROCKET_SERVER,
  apiPath: configuration.apiPath || "api/v1", // hard-coded in case it's missing from the settings file
  username: configuration.username || ROCKET_USER,
  password: configuration.password || ROCKET_PASSWORD,
  userId: configuration.userId || ROCKET_USER_ID,
  userKey: configuration.userKey || ROCKET_USER_KEY,
  defaultChannel: configuration.channel || null,
  loginOnStartup: configuration.loginOnStartup || false,
};
