import React from 'react';
import { Route } from 'react-router';
import uuid from 'node-uuid';

import { addLocation } from './actions/weather';

import App from './containers/App';
import * as containers from './containers';


const {
  WeatherPage,
  NotFoundPage,
} = containers;

const appInit = dispatch => {
  // Add local weather if geolocation is available
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = {
        latitude: pos.coords.latitude.toFixed(2),
        longitude: pos.coords.longitude.toFixed(2)
      };

      dispatch(addLocation({
        id: uuid.v4(),
        coords,
        unit: 'C'
      }));
    });
  }
};

/**
 *  /
 *  /another
 **/
const createRoutes = store => ( // eslint-disable-line no-unused-vars
  <Route component={App}>
    <Route path="/" component={WeatherPage} onEnter={appInit(store.dispatch)} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default createRoutes;
