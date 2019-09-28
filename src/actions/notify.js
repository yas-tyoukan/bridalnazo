export const NOTIFY_MESSAGE = Symbol('NOTIFY_MESSAGE');

export const notifyMessage = message => ({
  type: NOTIFY_MESSAGE,
  message,
  time: new Date().getTime(),
});
