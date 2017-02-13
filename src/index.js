import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './containers/Root';
import configureStore from './store/configureStore';

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);


const rootElement = document.getElementById('root');

let app;

if (module.hot) {
  const { AppContainer } = require('react-hot-loader'); // eslint-disable-line global-require
  app = (
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>
  );

  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      rootElement
    );
  });
} else {
  app = <Root store={store} history={history} />;
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(app, rootElement);
