import axios from 'axios';

export const REQUEST_POST_ACCOUNT = Symbol('REQUEST_POST_ACCOUNT');
export const REQUEST_POST_ACCOUNT_SUCCESS = Symbol('REQUEST_POST_ACCOUNT_SUCCESS');
export const REQUEST_POST_ACCOUNT_FAILURE = Symbol('REQUEST_POST_ACCOUNT_FAILURE');

export const REQUEST_GET_ACCOUNTS = Symbol('REQUEST_GET_ACCOUNTS');
export const REQUEST_GET_ACCOUNTS_SUCCESS = Symbol('REQUEST_GET_ACCOUNTS_SUCCESS');
export const REQUEST_GET_ACCOUNTS_FAILURE = Symbol('REQUEST_GET_ACCOUNTS_FAILURE');

export const REQUEST_DELETE_ACCOUNTS = Symbol('REQUEST_DELETE_ACCOUNTS');
export const REQUEST_DELETE_ACCOUNTS_SUCCESS = Symbol('REQUEST_DELETE_ACCOUNTS_SUCCESS');
export const REQUEST_DELETE_ACCOUNTS_FAILURE = Symbol('REQUEST_DELETE_ACCOUNTS_FAILURE');

function requestPost(targetType) {
  return {
    type: REQUEST_POST_ACCOUNT,
    targetType,
  };
}

function receivePostSuccess(data, targetType) {
  return {
    type: REQUEST_POST_ACCOUNT_SUCCESS,
    data,
    targetType,
  };
}

function requestPostFailure(error, targetType) {
  return {
    type: REQUEST_POST_ACCOUNT_FAILURE,
    error,
    targetType,
  };
}

export function postAccount(name, targetType) {
  return (dispatch) => {
    dispatch(requestPost(targetType));
    return axios.post('/api/accounts', { name, type: targetType })
      .then(({ data }) => {
        dispatch(receivePostSuccess(data, targetType));
      }, (e) => {
        dispatch(requestPostFailure(e, targetType));
        throw e;
      });
  };
}

function requestGet() {
  return {
    type: REQUEST_GET_ACCOUNTS,
  };
}

function receiveGetSuccess(data) {
  return {
    type: REQUEST_GET_ACCOUNTS_SUCCESS,
    data,
  };
}

function requestGetFailure(error) {
  return {
    type: REQUEST_GET_ACCOUNTS_FAILURE,
    error,
  };
}

export function getAccounts() {
  return (dispatch) => {
    dispatch(requestGet());
    return axios.get('/api/accounts')
      .then(({ data }) => {
        dispatch(receiveGetSuccess(data));
      }, (e) => {
        dispatch(requestGetFailure(e));
        throw e;
      });
  };
}

function requestDelete(targetType) {
  return {
    type: REQUEST_DELETE_ACCOUNTS,
    targetType,
  };
}

function receiveDeleteSuccess(data) {
  return {
    type: REQUEST_DELETE_ACCOUNTS_SUCCESS,
    data,
  };
}

function requestDeleteFailure(error) {
  return {
    type: REQUEST_DELETE_ACCOUNTS_FAILURE,
    error,
  };
}

export function deleteAccounts() {
  return (dispatch) => {
    dispatch(requestDelete());
    return axios.delete('/api/accounts')
      .then(({ data }) => {
        dispatch(receiveDeleteSuccess(data));
      }, (e) => {
        dispatch(requestDeleteFailure(e));
        throw e;
      });
  };
}
