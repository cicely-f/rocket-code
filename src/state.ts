type channelMode = 'channel' | 'group' | 'im';

type State = {
  currentMode: channelMode;
  roomId?: string;
  isLoggedIn: boolean;
};

export const state: State = {
  currentMode: 'channel',
  roomId: null,
  isLoggedIn: false,
};

const setMode = (mode: channelMode) => {
  state.currentMode = mode;
};

export default {
  state,
  setMode,
};
