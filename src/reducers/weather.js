/* eslint-disable no-unused-vars */
import createReducer from '../utils/createReducer';
import {
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  ADD_WEATHER_LOCATION,
  REMOVE_WEATHER_LOCATION
} from '../actions/weather';


const preloadedState = {
  isGeolocationAvailable: !!navigator.geolocation,
  locations: []
};

const weather = createReducer(preloadedState, {
  [ADD_WEATHER_LOCATION]: (state, action) => {
    const newState = Object.assign({}, state);

    newState.locations.push({
      id: state.locations.length, // I'm sorry
      isLoading: true,
      ...action.newLocation
    });

    return newState;
  },
  [REMOVE_WEATHER_LOCATION]: (state, action) => {
    const newState = Object.assign({}, state);

    newState.locations.splice(action.index, 1);

    return newState;
  },
  [RECEIVE_WEATHER]: (state, action) => {
    const newState = Object.assign({}, state);

    newState.locations[action.id].data = action.data;
    newState.locations[action.id].isLoading = false;

    return newState;
  }
});


export default weather;
