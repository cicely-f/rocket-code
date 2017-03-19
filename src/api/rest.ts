import { Client } from 'node-rest-client';

type restVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
const GET = 'GET';
const POST = 'POST';
const client = new Client();
const serverUrl = "https://rocket.chas.se/api/v1";
const status = require('http-status-codes');

//
function getPromise(name, args?) {
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

const register = (name, verb: restVerb) => client.registerMethod(name, `${serverUrl}/${name}`, verb);

/**************************************************************************************************************
API ENDPOINTS
***************************************************************************************************************/
const defaultHeaders = {
  "Content-Type": "application/json",
};

let headers = defaultHeaders;

/** MISCELLANEOUS */
register('info', GET);
export async function info() {
  return await getPromise('info');
}

/** AUTHENTICATION */
register('login', POST);
export async function login(username: string, password: string) {
  const args = {
    headers,
    data: { username, password },
  };
  const result = await getPromise('login', args);
  headers["X-User-Id"] = result.data.userId;
  headers["X-Auth-Token"] = result.data.authToken;
  return result;
}

register('logout', GET); // requires auth
export async function logout() {
  const args = {
    headers,
  };
  const result = await getPromise('logout', args);
  headers = defaultHeaders;
  return result;
}

register('me', GET); // requires auth)
export async function me() {
  const args = {
    headers,
  };
  return await getPromise('me', args);
}

/** USERS */
register('users.getPresence', GET);
register('users.info', GET);
register('users.list', GET);

export const users = {

  getPresence: async function getPresence(userId?) {
    const args = {
      headers,
      parameters: { userId },
    };
    return await getPromise('users.getPresence', args);
  },

  info: async function info(userId?) {
    const args = {
      headers,
      parameters: { userId },
    };
    return await getPromise('users.info', args);
  },

  list: async function list() {
    const args = { headers };
    return await getPromise('users.list', args);
  },

};

/** CHANNELS */
register('channels.close', POST);
register('channels.create', POST);
register('channels.history', GET);
register('channels.info', GET);
register('channels.invite', POST);
register('channels.leave', POST);
register('channels.list.joined', GET);
register('channels.list', GET);
register('channels.open', POST);
register('channels.rename', POST);
register('channels.setDescription', POST);
register('channels.setPurpose', POST);
register('channels.setTopic', POST);

export const channels = {

  close: async function close(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('channels.close', args);
  },

  create: async function create(name: string, members?: string[]) {
    const args = {
      headers,
      data: { name, members },
    };
    return await getPromise('channels.create', args);
  },

  history: async function history(roomId: string, latest?: Date, oldest?: Date, inclusive = false, count = 20, unreads = false) {
    const args = {
      headers,
      parameters: { roomId, latest, oldest, inclusive, count, unreads },
    };
    return await getPromise('channels.history', args);
  },

  info: async function info(roomId: string) {
    const args = {
      headers,
      parameters: { roomId },
    };
    return await getPromise('channels.info', args);
  },

  invite: async function invite(roomId: string, userId: string) {
    const args = {
      headers,
      data: { roomId, userId },
    };
    return await getPromise('channels.invite', args);
  },

  leave: async function leave(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('channels.leave', args);
  },

  'list.joined': async function listJoined() {
    const args = { headers };
    return await getPromise('channels.list.joined', args);
  },

  list: async function list(roomId: string, offset = 0, count = 0) {
    const args = {
      headers,
      parameters: { roomId, offset, count },
    };
    return await getPromise('channels.list', args);
  },

  open: async function open(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('channels.open', args);
  },

  rename: async function rename(roomId: string, name: string) {
    const args = {
      headers,
      data: { roomId, name },
    };
    return await getPromise('channels.rename', args);
  },

  setDescription: async function setDescription(roomId: string, description: string) {
    const args = {
      headers,
      data: { roomId, description },
    };
    return await getPromise('channels.setDescription', args);
  },

  setPurpose: async function setPurpose(roomId: string, purpose: string) {
    const args = {
      headers,
      data: { roomId, purpose },
    };
    return await getPromise('channels.setPurpose', args);
  },

  setTopic: async function setTopic(roomId: string, topic: string) {
    const args = {
      headers,
      data: { roomId, topic },
    };
    return await getPromise('channels.setTopic', args);
  },

};

/** INSTANT MESSAGES */
register('im.close', POST);
register('im.history', GET);
register('im.list', GET);
register('im.list.everyone', GET);
register('im.open', POST);
register('im.setTopic', POST);

export const im = {

  close: async function close(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('im.close', args);
  },

  history: async function history(roomId: string, latest?: Date, oldest?: Date, inclusive = false, count = 20, unreads = false) {
    const args = {
      headers,
      parameters: { roomId, latest, oldest, inclusive, count, unreads },
    };
    return await getPromise('im.history', args);
  },

  list: async function list() {
    const args = { headers };
    return await getPromise('im.list', args);
  },

  'list.everyone': async function listEveryone() {
    const args = { headers };
    return await getPromise('im.list.everyone', args);
  },

  open: async function open(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('im.open', args);
  },

  setTopic: async function setTopic(roomId: string, topic: string) {
    const args = {
      headers,
      data: { roomId, topic },
    };
    return await getPromise('im.setTopic', args);
  },
};

/** CHAT */
register('chat.delete', POST);
register('chat.postMessage', POST);
register('chat.update', POST);

export const chat = {

  delete: async function deleteChat(roomId: string, msgId: string, asUser = false) {
    const args = {
      headers,
      data: { roomId, msgId, asUser },
    };
    return await getPromise('chat.delete', args);
  },

  // TODO: see about implementing the rest of the features like attachments etc...
  postMessage: async function postMessage(roomId: string, text: string) {
    const args = {
      headers,
      data: { roomId, text },
    };
    return await getPromise('chat.postMessage', args);
  },

  update: async function update(roomId: string, msgId: string, text: string) {
    const args = {
      headers,
      data: { roomId, msgId, text },
    };
    return await getPromise('chat.update', args);
  },

};

/** EXPORT COMPLETE API */
export const api = {
  info,
  login,
  logout,
  me,
  users,
  channels,
  im,
  chat,
};
