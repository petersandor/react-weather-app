import uuid from 'node-uuid';

import weather from '../utils/weatherApiClient';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const RECEIVE_WEATHER_ERR = 'RECEIVE_WEATHER_ERR';

export const OPEN_NEW_LOCATION_DIALOG = 'OPEN_NEW_LOCATION_DIALOG';
export const CLOSE_NEW_LOCATION_DIALOG = 'CLOSE_NEW_LOCATION_DIALOG';
export const CHANGE_INPUT_LOCATION_DIALOG = 'CHANGE_INPUT_LOCATION_DIALOG';

export const ADD_WEATHER_LOCATION = 'ADD_WEATHER_LOCATION';
export const REMOVE_WEATHER_LOCATION = 'REMOVE_WEATHER_LOCATION';

export const TOGGLE_WEATHER_LOCATION_UNIT = 'TOGGLE_WEATHER_LOCATION_UNIT';

export const toggleLocationUnit = id => ({
  type: 'TOGGLE_WEATHER_LOCATION_UNIT',
  id
});

export const removeLocation = id => ({
  type: 'REMOVE_WEATHER_LOCATION',
  id
});

export const changeInputLocation = (event, value) => ({
  type: 'CHANGE_INPUT_LOCATION_DIALOG',
  value
});

export const addLocation = location => dispatch => {
  // First we dispatch an action about the newly added location
  dispatch({
    type: 'ADD_WEATHER_LOCATION',
    location
  });

  // If coordinates were specified, use them
  if ('coords' in location) {
    weather.setCoordinate(location.coords.latitude, location.coords.longitude);
  }

  if (location.cityName && location.cityName.length) {
    weather.setCity(location.cityName);
  }

  // Use openweather-apis to query the data and dispatch actions on reply
  return weather.getAllWeather((err, data) => {
    if (err) {
      dispatch({
        type: 'RECEIVE_WEATHER_ERR',
        err
      });

      throw err;
    }

    dispatch({
      type: 'RECEIVE_WEATHER',
      id: location.id,
      data
    });

    // weather module is a stateful singleton, we need to reset previous config
    // or write something to handle this since this is quite brutal
    // its like you have a friend, then you say to him that everything was a lie
    weather.setCoordinate(false, false);
    weather.setCity('');
  });
};

export const openNewLocationDialog = () => ({
  type: 'OPEN_NEW_LOCATION_DIALOG'
});

export const closeNewLocationDialog = event => dispatch => {
  // In any case, we want to close the dialog
  dispatch({
    type: 'CLOSE_NEW_LOCATION_DIALOG'
  });

  // If submit button was clicked, grab the cityName and add as a new location
  if (event.type === 'SUBMIT') {
    dispatch(
      addLocation({
        id: uuid.v4(),
        cityName: event.value
      })
    );
  }
};
