import { workspace } from 'vscode';
import { Client } from 'node-rest-client';
import { headers } from './rocket-api';

type restVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // for some reason, Rocket.Chat only uses GET and POST... so not really REST :/

const client = new Client();
const status = require('http-status-codes');
const apiPath = 'api/v1';
const config = workspace.getConfiguration('rocketCode');
const serverUrl = config.serverUrl || process.env.ROCKET_SERVER;
// const headers = {
//   "Content-Type": "application/json",
// };

export function getPromise(name, args?) {
  return new Promise<any>((resolve, reject) => {
    client.methods[name](args, (data, response) => {
      if (response.statusCode === status.OK) {
        resolve(data);
      } else {
        console.error('error response', status.getStatusText(response.statusCode));
        reject(response);
      }
    });
  });
}

export const register = (name, verb: restVerb) => client.registerMethod(name, `${serverUrl}/${apiPath}/${name}`, verb);

// TODO: make this actually work for functions that need data or parameters... :/
export function generateFn(name: string, verb: restVerb, data?, parameters?) {
  return async function (data?, parameters?) {
    const args = {
      headers,
      data,
      parameters,
    };
    register(name, verb);
    return await getPromise(name, args);
  };
}

export default {
  getPromise,
  register,
  generateFn,
};
