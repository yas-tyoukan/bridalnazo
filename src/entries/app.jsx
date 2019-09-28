import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';

import * as rootReducer from '~/reducers';
import configureStore from '~/configureStore';
import Wrapper from '~/components/routings/Wrapper';
import App from '~/components/routings/App';

const rootEl = document.getElementById('root');

const store = configureStore(rootReducer);

ReactDOM.render(
  <Wrapper store={store}>
    <App />
  </Wrapper>,
  rootEl,
);
