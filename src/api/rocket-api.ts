import { getPromise, register, generateFn } from './helpers';

const GET = 'GET';
const POST = 'POST';

/**************************************************************************************************************
API ENDPOINTS
***************************************************************************************************************/
export const headers = {
  "Content-Type": "application/json",
};


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
  delete headers["X-User-Id"];
  delete headers["X-Auth-Token"];
  return result;
}

// register('me', GET); // requires auth)
// export async function me() {
//   const args = {
//     headers,
//   };
//   return await getPromise('me', args);
// }
export const me = generateFn('me', GET);

export function isLoggedIn(): boolean {
  return !!headers["X-User-Id"] && !!headers["X-Auth-Token"];
}

/** USERS */
register('users.getPresence', GET);
register('users.info', GET);
register('users.list', GET);
register('users.setAvatar', POST);

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

  setAvatar: async function setAvatar(avatarUrl: string) {
    const args = {
      headers,
      data: { avatarUrl },
    };
    return await getPromise('users.setAvatar', args);
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

  listJoined: async function listJoined() {
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

/** GROUPS */
register('groups.close', POST);
register('groups.create', POST);
register('groups.history', GET);
register('groups.info', GET);
register('groups.invite', POST);
register('groups.leave', POST);
register('groups.list', GET);
register('groups.open', POST);
register('groups.rename', POST);
register('groups.setDescription', POST);
register('groups.setPurpose', POST);
register('groups.setTopic', POST);

export const groups = {

  close: async function close(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('groups.close', args);
  },

  create: async function create(name: string, members?: string[]) {
    const args = {
      headers,
      data: { name, members },
    };
    return await getPromise('groups.create', args);
  },

  history: async function history(roomId: string, latest?: Date, oldest?: Date, inclusive = false, count = 20, unreads = false) {
    const args = {
      headers,
      parameters: { roomId, latest, oldest, inclusive, count, unreads },
    };
    return await getPromise('groups.history', args);
  },

  info: async function info(roomId: string) {
    const args = {
      headers,
      parameters: { roomId },
    };
    return await getPromise('groups.info', args);
  },

  invite: async function invite(roomId: string, userId: string) {
    const args = {
      headers,
      data: { roomId, userId },
    };
    return await getPromise('groups.invite', args);
  },

  leave: async function leave(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('groups.leave', args);
  },

  list: async function list(offset = 0, count = 0) {
    const args = {
      headers,
      parameters: { offset, count },
    };
    return await getPromise('groups.list', args);
  },

  open: async function open(roomId: string) {
    const args = {
      headers,
      data: { roomId },
    };
    return await getPromise('groups.open', args);
  },

  rename: async function rename(roomId: string, name: string) {
    const args = {
      headers,
      data: { roomId, name },
    };
    return await getPromise('groups.rename', args);
  },

  setDescription: async function setDescription(roomId: string, description: string) {
    const args = {
      headers,
      data: { roomId, description },
    };
    return await getPromise('groups.setDescription', args);
  },

  setPurpose: async function setPurpose(roomId: string, purpose: string) {
    const args = {
      headers,
      data: { roomId, purpose },
    };
    return await getPromise('groups.setPurpose', args);
  },

  setTopic: async function setTopic(roomId: string, topic: string) {
    const args = {
      headers,
      data: { roomId, topic },
    };
    return await getPromise('groups.setTopic', args);
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

  list: async function list(offset = 0, count = 0) {
    const args = {
      headers,
      parameters: { offset, count },
    };
    return await getPromise('im.list', args);
  },

  listEveryone: async function listEveryone() {
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

const chat = {

  delete: async function deleteChat(roomId: string, msgId: string, asUser = false) {
    const args = {
      headers,
      data: { roomId, msgId, asUser },
    };
    return await getPromise('chat.delete', args);
  },

  // TODO: see about implementing the rest of the features like attachments etc...
  postMessage: async function postMessage(roomId: string, text: string) {
    console.log(roomId, text);
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
  headers,
  isLoggedIn,
  info,
  login,
  logout,
  me,
  users,
  channels,
  groups,
  im,
  chat,
};
