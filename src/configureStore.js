import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  // webpackでのビルドを前提としたprocess.env.NODE_ENVによる判定 (https://webpack.js.org/configuration/mode/)
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const reduxLogger = require('redux-logger');
  middleware.push(reduxLogger.createLogger());
}

export const history = createBrowserHistory();

export default function configureStore(reducers, initialState) {
  return createStore(
    combineReducers({ ...reducers, router: connectRouter(history) }),
    initialState,
    applyMiddleware(
      ...middleware,
    ),
  );
}
