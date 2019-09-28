import {
  REQUEST_POST_ACCOUNT,
  REQUEST_POST_ACCOUNT_FAILURE,
  REQUEST_POST_ACCOUNT_SUCCESS,
} from '~/actions/accounts';

const TYPE_RING = 'yubiwa_is_beautiful';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  const { targetType } = action;
  switch (action.type) {
    case REQUEST_POST_ACCOUNT:
      return targetType === TYPE_RING
        ? {
          loading: true,
        }
        : state;

    case REQUEST_POST_ACCOUNT_SUCCESS:
    case REQUEST_POST_ACCOUNT_FAILURE:
      return targetType === TYPE_RING
        ? {
          loading: false,
        }
        : state;

    default:
      return state;
  }
};
