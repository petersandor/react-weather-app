import uuid from 'uuid';

import DarkSky from '../utils/weatherApiClient';
import googleMapsClient from '../utils/mapsApiClient';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const RECEIVE_WEATHER_ERR = 'RECEIVE_WEATHER_ERR';
export const OPEN_NEW_LOCATION_DIALOG = 'OPEN_NEW_LOCATION_DIALOG';
export const CLOSE_NEW_LOCATION_DIALOG = 'CLOSE_NEW_LOCATION_DIALOG';
export const CHANGE_INPUT_LOCATION_DIALOG = 'CHANGE_INPUT_LOCATION_DIALOG';
export const ADD_WEATHER_LOCATION = 'ADD_WEATHER_LOCATION';
export const REFRESH_WEATHER_LOCATION_START = 'REFRESH_WEATHER_LOCATION_START';
export const REFRESH_WEATHER_LOCATION_DONE = 'REFRESH_WEATHER_LOCATION_DONE';
export const REMOVE_WEATHER_LOCATION = 'REMOVE_WEATHER_LOCATION';
export const TOGGLE_WEATHER_LOCATION_UNIT = 'TOGGLE_WEATHER_LOCATION_UNIT';

const DARK_SKY_API_EXCLUDE = 'alerts,daily,hourly,minutely';

const refreshLocation = (id, location) => dispatch => {
  const coords = {
    latitude: location.latitude,
    longitude: location.longitude
  };

  dispatch({
    type: 'REFRESH_WEATHER_LOCATION_START',
    id
  });

  return DarkSky
    .loadItAll(DARK_SKY_API_EXCLUDE, coords)
      .then(data => {
        dispatch({
          type: 'REFRESH_WEATHER_LOCATION_DONE',
          id,
          data
        });
      })
      .catch(err => {
        dispatch({
          type: 'RECEIVE_WEATHER_ERR',
          id,
          err
        });
      });
};

export const removeLocation = id => ({
  type: 'REMOVE_WEATHER_LOCATION',
  id
});

export const changeInputLocation = value => ({
  type: 'CHANGE_INPUT_LOCATION_DIALOG',
  value
});

export const addLocation = location => dispatch => {
  const newLocation = { ...location };

  // First we dispatch an action about the newly added location
  dispatch({
    type: 'ADD_WEATHER_LOCATION',
    location
  });

  // If coordinates were specified, use them (if not, we need to get them)
  if (!newLocation.coords && newLocation.cityName.length) {
    return googleMapsClient
      .geocode({
        address: newLocation.cityName
      })
      .asPromise()
      .then(data => {
        const result = data.json.results[0];

        return {
          coords: result.geometry.location,
          id: result.place_id
        };
      })
      .then(place => {
        const newCoords = {
          latitude: place.coords.lat,
          longitude: place.coords.lng
        };

        return DarkSky
          .loadItAll(DARK_SKY_API_EXCLUDE, newCoords)
            .then(data => {
              dispatch({
                type: 'RECEIVE_WEATHER',
                id: newLocation.id,
                placeId: place.id,
                name: newLocation.cityName,
                data
              });
            })
            .catch(err => {
              dispatch({
                type: 'RECEIVE_WEATHER_ERR',
                id: newLocation.id,
                placeId: place.id,
                name: newLocation.cityName,
                err
              });
            });
      })
      .catch(error => {
        dispatch({
          type: 'RECEIVE_WEATHER_ERR',
          id: newLocation.id,
          error
        });
      });
  }

  // No city name provided, have to get it by reverse geocode
  if (!newLocation.cityName && !!newLocation.coords) {
    return googleMapsClient
      .reverseGeocode({
        latlng: newLocation.coords,
        result_type: ['locality']
      })
      .asPromise()
      .then(data => {
        if (data.json.status !== 'OK') {
          dispatch({
            type: 'RECEIVE_WEATHER_ERR',
            id: newLocation.id,
            placeId: 'none',
            name: 'No results',
            err: data.json.status
          });
        }

        const result = data.json.results[0];

        return {
          name: result.formatted_address,
          id: result.place_id
        };
      })
      .then(place =>
        DarkSky
          .loadItAll(DARK_SKY_API_EXCLUDE, newLocation.coords)
            .then(data => {
              dispatch({
                type: 'RECEIVE_WEATHER',
                id: newLocation.id,
                placeId: place.id,
                name: place.name,
                data
              });
            })
            .catch(err => {
              dispatch({
                type: 'RECEIVE_WEATHER_ERR',
                id: newLocation.id,
                placeId: place.id,
                name: place.name,
                err
              });
            })
      );
  }

  return false;
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

export const toggleLocationUnit = (id, location) => dispatch => {
  dispatch({
    type: 'TOGGLE_WEATHER_LOCATION_UNIT',
    id
  });

  refreshLocation(id, location)(dispatch);
};
