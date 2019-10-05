import {
  REQUEST_DELETE_ACCOUNTS,
  REQUEST_DELETE_ACCOUNTS_FAILURE,
  REQUEST_DELETE_ACCOUNTS_SUCCESS,
  REQUEST_GET_ACCOUNTS,
  REQUEST_GET_ACCOUNTS_FAILURE,
  REQUEST_GET_ACCOUNTS_SUCCESS,
} from '../actions/accounts';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DELETE_ACCOUNTS:
    case REQUEST_GET_ACCOUNTS:
      return { loading: true };

    case REQUEST_GET_ACCOUNTS_SUCCESS: {
      const { data } = action;
      return {
        loading: false,
        accounts: data,
      };
    }

    case REQUEST_DELETE_ACCOUNTS_SUCCESS:
      return initialState;

    case REQUEST_DELETE_ACCOUNTS_FAILURE:
    case REQUEST_GET_ACCOUNTS_FAILURE:
      return {
        loading: false,
      };

    default:
      return state;
  }
};
