/* eslint-disable global-require */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';
import { fetchWeather } from '../actions/weather';

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(browserHistory);

/**
 * Creates a preconfigured store.
 */
const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, router, logger),
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  // Add local weather if geolocation is available
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      store.dispatch(fetchWeather({
        id: 0,  // This will always be the first card
        coords: pos.coords
      }));
    });
  }

  return store;
};


export default configureStore;
