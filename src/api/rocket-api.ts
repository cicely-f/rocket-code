import { getPromise, registerClientMethod, register } from './helpers';

const GET = 'GET';
const POST = 'POST';

/**************************************************************************************************************
API ENDPOINTS
***************************************************************************************************************/
export const headers = {
  "Content-Type": "application/json",
};

/**************************************************************************************************************
AUTHENTICATION is a bit special because we have to fiddle with the headers for subsequent api calls
***************************************************************************************************************/
registerClientMethod('login', POST);
registerClientMethod('logout', GET); // requires auth

export const auth = {
  login: async function login(user: string, password: string) {
    const args = {
      headers,
      data: { user, password },
    };
    const result = await getPromise('login', args);
    headers["X-User-Id"] = result.data.userId;
    headers["X-Auth-Token"] = result.data.authToken;
    return result;
  },
  loginWithKey: async function loginWithKey(userId: string, userKey: string) {
    headers["X-User-Id"] = userId;
    headers["X-Auth-Token"] = userKey;
  },
  logout: async function logout() {
    const args = {
      headers,
    };
    const result = await getPromise('logout', args);
    delete headers["X-User-Id"];
    delete headers["X-Auth-Token"];
    return result;
  },
  me: register('me', GET),
  isLoggedIn: (): boolean => !!headers["X-User-Id"] && !!headers["X-Auth-Token"],
};

/**************************************************************************************************************
MISCELLANEOUS
***************************************************************************************************************/
export const misc = {
  info: register('info', GET),
};

/**************************************************************************************************************
USERS
***************************************************************************************************************/
export const users = {
  getPresence: register('users.getPresence', GET),
  info: register('users.info', GET),
  list: register('users.list', GET),
  setAvatar: register('users.setAvatar', POST),
};

/**************************************************************************************************************
CHANNELS
***************************************************************************************************************/
export const channels = {
  close: register('channels.close', POST),
  create: register('channels.create', POST),
  history: register('channels.history', GET),
  info: register('channels.info', GET),
  invite: register('channels.invite', POST),
  leave: register('channels.leave', POST),
  listJoined: register('channels.list.joined', GET),
  list: register('channels.list', GET),
  open: register('channels.open', POST),
  rename: register('channels.rename', POST),
  setDescription: register('channels.setDescription', POST),
  setPurpose: register('channels.setPurpose', POST),
  setTopic: register('channels.setTopic', POST),
};

/**************************************************************************************************************
GROUPS
***************************************************************************************************************/
export const groups = {
  close: register('groups.close', POST),
  create: register('groups.create', POST),
  history: register('groups.history', GET),
  info: register('groups.info', GET),
  invite: register('groups.invite', POST),
  leave: register('groups.leave', POST),
  list: register('groups.list', GET),
  open: register('groups.open', POST),
  rename: register('groups.rename', POST),
  setDescription: register('groups.setDescription', POST),
  setPurpose: register('groups.setPurpose', POST),
  setTopic: register('groups.setTopic', POST),
};

/**************************************************************************************************************
INSTANT MESSAGES
***************************************************************************************************************/
export const im = {
  close: register('im.close', POST),
  history: register('im.history', GET),
  list: register('im.list', GET),
  listEveryone: register('im.list.everyone', GET),
  open: register('im.open', POST),
  setTopic: register('im.setTopic', POST),
};

/**************************************************************************************************************
CHAT
***************************************************************************************************************/
export const chat = {
  delete: register('chat.delete', POST),
  postMessage: register('chat.postMessage', POST),
  update: register('chat.update', POST),
};

/**************************************************************************************************************
COMPLETE API
***************************************************************************************************************/
export const api = {
  headers,
  auth,
  misc,
  users,
  channels,
  groups,
  im,
  chat,
};
