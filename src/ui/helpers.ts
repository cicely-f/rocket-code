import { window } from 'vscode';

const responseStatus = require('http-status-codes');

export const loginError = reason => window.showErrorMessage(`Error logging in. Please check your credentials.`);

export const showErrorMessage = error => {
  console.log('Rocket.Chat error:', error);
  const code = error.statusCode || null;
  let errorMessage;
  switch (code) {
    case responseStatus.UNAUTHORIZED:
      errorMessage = 'You must log in to Rocket.Chat before doing this.';
      break;
    default:
      errorMessage = `Rocket.Chat error: ${responseStatus.getStatusText(code)}`;
  }
  window.showErrorMessage(errorMessage);
};

export default {
  loginError,
  showErrorMessage,
};
