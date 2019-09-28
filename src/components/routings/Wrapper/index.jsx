import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core';

import '~/styles/base';

import theme from '~/components/theme';
import { history } from '~/configureStore';

const Wrapper = ({ store, children }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {children}
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
);

Wrapper.propTypes = {
  store: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export default Wrapper;
