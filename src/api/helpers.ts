
import { Client } from 'node-rest-client';
import { headers } from './rocket-api';
import { config } from '../config';

type restVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // for some reason, Rocket.Chat only uses GET and POST... so not really REST :/
interface IArgs {
  headers: object;
  data?: object;
  parameters?: object;
}

const client = new Client();
const status = require('http-status-codes');
const { server, apiPath } = config;
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

export const registerClientMethod = (name, verb: restVerb) => client.registerMethod(name, `${server}/${apiPath}/${name}`, verb);

// TODO: make this actually work for functions that need data or parameters... :/
export function register(name: string, verb: restVerb, opts?) {
  registerClientMethod(name, verb);

  return async function (opts?) {
    const args: IArgs = { headers };
    if (verb === 'POST') {
      args.data = opts;
    } else {
      args.parameters = opts;
    }
    console.log(`in generateFn: ${name}, ${JSON.stringify(args)}`);
    return await getPromise(name, args);
  };
}

export default {
  getPromise,
  registerClientMethod,
  register,
};
