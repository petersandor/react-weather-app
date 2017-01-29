/* eslint-disable no-unused-vars */
import createReducer from '../utils/createReducer';
import {
  OPEN_NEW_LOCATION_DIALOG,
  CLOSE_NEW_LOCATION_DIALOG,
  CHANGE_INPUT_LOCATION_DIALOG,
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  ADD_WEATHER_LOCATION,
  REMOVE_WEATHER_LOCATION
} from '../actions/weather';


const preloadedState = {
  isGeolocationAvailable: !!navigator.geolocation,
  isNewLocationModalOpen: false,
  locations: []
};

const weather = createReducer(preloadedState, {
  [OPEN_NEW_LOCATION_DIALOG]: (state, action) => ({
    ...state,
    isNewLocationModalOpen: true
  }),
  [CLOSE_NEW_LOCATION_DIALOG]: (state, action) => ({
    ...state,
    isNewLocationModalOpen: false
  }),
  [CHANGE_INPUT_LOCATION_DIALOG]: (state, action) => ({
    ...state,
    cityInputValue: action.value
  }),
  [ADD_WEATHER_LOCATION]: (state, action) => ({
    ...state,
    isNewLocationModalOpen: false,
    locations: [...state.locations, {
      isLoading: true,
      ...action.location
    }]
  }),
  [REMOVE_WEATHER_LOCATION]: (state, action) => {
    const newState = Object.assign({}, state);

    const findById = element => element.id === action.id;
    const targetIndex = newState.locations.findIndex(findById);

    newState.locations.splice(targetIndex, 1);

    return newState;
  },
  [RECEIVE_WEATHER]: (state, action) => {
    const newState = Object.assign({}, state);

    // Temp find item by id
    const findById = element => element.id === action.id;

    const location = newState.locations.find(findById);

    location.data = action.data;
    location.isLoading = false;

    return newState;
  }
});


export default weather;
