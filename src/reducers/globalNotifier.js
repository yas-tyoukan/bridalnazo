import {
  NOTIFY_MESSAGE,
} from '~/actions/notify';

const initialState = {
  notifyMessage: '',
  notifiedAt: null,
};

export default function globalNotifier(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_MESSAGE: {
      const { message, time } = action;
      return {
        ...state,
        notifiedAt: time,
        notifyMessage: message,
      };
    }

    default:
      return state;
  }
}
