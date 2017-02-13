import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { deepOrange500 } from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createRoutes from '../createRoutes';

const weatherAppTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange500
  }
});

const Root = ({ store, history }) => (
  <MuiThemeProvider muiTheme={weatherAppTheme}>
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
