/* eslint-disable no-unused-vars */
import createReducer from '../utils/createReducer';
import {
  OPEN_NEW_LOCATION_DIALOG,
  CLOSE_NEW_LOCATION_DIALOG,
  CHANGE_INPUT_LOCATION_DIALOG,
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  RECEIVE_WEATHER_ERR,
  ADD_WEATHER_LOCATION,
  REFRESH_WEATHER_LOCATION_START,
  REFRESH_WEATHER_LOCATION_DONE,
  REMOVE_WEATHER_LOCATION,
  TOGGLE_WEATHER_LOCATION_UNIT
} from '../actions/weather';

import DarkSky from '../utils/weatherApiClient';


const preloadedState = {
  isGeolocationAvailable: !!navigator.geolocation,
  isNewLocationModalOpen: false,
  locations: {
    byId: {},
    allIds: []
  }
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
  [ADD_WEATHER_LOCATION]: (state, action) => {
    const { location } = action;

    // I'm sorry, it's a global object shared across all locations
    // TODO: create separate weather service for each card
    DarkSky.setUnits('si');

    return {
      ...state,
      cityInputValue: '',
      locations: {
        allIds: [
          ...state.locations.allIds,
          location.id
        ],
        byId: {
          ...state.locations.byId,
          [location.id]: {
            isLoading: true,
            unit: 'C'
          }
        }
      }
    };
  },
  [REFRESH_WEATHER_LOCATION_START]: (state, action) => ({
    ...state,
    locations: {
      ...state.locations,
      byId: {
        ...state.locations.byId,
        [action.id]: {
          ...state.locations.byId[action.id],
          isLoading: true
        }
      }
    }
  }),
  [REFRESH_WEATHER_LOCATION_DONE]: (state, action) => ({
    ...state,
    locations: {
      ...state.locations,
      byId: {
        ...state.locations.byId,
        [action.id]: {
          ...state.locations.byId[action.id],
          ...action.data,
          units: DarkSky.getResponseUnits(),
          isLoading: false
        }
      }
    }
  }),
  [REMOVE_WEATHER_LOCATION]: (state, action) => {
    const newByIdsObj = Object.assign({}, state.locations.byId);
    delete newByIdsObj[action.id];

    const newIds = state.locations.allIds.slice();
    const idIndex = newIds.indexOf(action.id);
    newIds.splice(idIndex, 1);

    return {
      ...state,
      locations: {
        ...state.locations,
        allIds: newIds,
        byId: newByIdsObj
      }
    };
  },
  [RECEIVE_WEATHER]: (state, action) => ({
    ...state,
    locations: {
      ...state.locations,
      byId: {
        ...state.locations.byId,
        [action.id]: {
          ...state.locations.byId[action.id],
          ...action.data,
          units: DarkSky.getResponseUnits(),
          name: action.name,
          isLoading: false
        }
      }
    }
  }),
  [RECEIVE_WEATHER_ERR]: (state, action) => ({
    ...state,
    locations: {
      ...state.locations,
      byId: {
        ...state.locations.byId,
        [action.id]: {
          ...state.locations.byId[action.id],
          name: action.name,
          isLoading: false
        }
      }
    }
  }),
  [TOGGLE_WEATHER_LOCATION_UNIT]: (state, action) => {
    const prevUnit = state.locations.byId[action.id].unit;
    const responseUnits = DarkSky.getResponseUnits();

    if (prevUnit === 'C' && responseUnits.temperature === 'c') {
      DarkSky.setUnits('us');
    } else {
      DarkSky.setUnits('si');
    }

    return {
      ...state,
      locations: {
        ...state.locations,
        byId: {
          ...state.locations.byId,
          [action.id]: {
            ...state.locations.byId[action.id],
            unit: prevUnit === 'C' ? 'F' : 'C'
          }
        }
      }
    };
  }
});


export default weather;
