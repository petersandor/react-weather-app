import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createRoutes from '../createRoutes';


const Root = ({ store, history }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={createRoutes(store)} />
    </Provider>
  </MuiThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};


export default Root;
