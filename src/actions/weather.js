import weather from '../utils/weatherApiClient';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const RECEIVE_WEATHER_ERR = 'RECEIVE_WEATHER_ERR';

export const ADD_WEATHER_LOCATION = 'ADD_WEATHER_LOCATION';
export const REMOVE_WEATHER_LOCATION = 'REMOVE_WEATHER_LOCATION';

export const addLocation = newLocation => {
  return {
    type: 'ADD_WEATHER_LOCATION',
    newLocation
  };
};

export const removeLocation = locationIndex => {
  return {
    type: 'REMOVE_WEATHER_LOCATION',
    index: locationIndex
  };
};

export const fetchWeather = location => dispatch => {
  // First we dispatch an action about the newly added location
  dispatch(addLocation(location));

  // If coordinates were specified, use them
  if ('coords' in location) {
    weather.setCoordinate(location.coords.latitude, location.coords.longitude);
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
