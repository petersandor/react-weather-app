/* eslint-disable no-unused-vars */
import createReducer from '../utils/createReducer';
import {
  OPEN_NEW_LOCATION_DIALOG,
  CLOSE_NEW_LOCATION_DIALOG,
  CHANGE_INPUT_LOCATION_DIALOG,
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  ADD_WEATHER_LOCATION,
  REMOVE_WEATHER_LOCATION,
  TOGGLE_WEATHER_LOCATION_UNIT
} from '../actions/weather';


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
    const newLocation = action.location;

    return {
      ...state,
      cityInputValue: '',
      locations: {
        allIds: [
          ...state.locations.allIds,
          newLocation.id
        ],
        byId: {
          ...state.locations.byId,
          [newLocation.id]: {
            isLoading: true,
            unit: 'C'
          }
        }
      }
    };
  },
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
  [RECEIVE_WEATHER]: (state, action) => {
    return {
      ...state,
      locations: {
        ...state.locations,
        byId: {
          ...state.locations.byId,
          [action.id]: {
            ...state.locations.byId[action.id],
            data: action.data,
            isLoading: false
          }
        }
      }
    };
  },
  [TOGGLE_WEATHER_LOCATION_UNIT]: (state, action) => {
    const prevUnit = state.locations.byId[action.id].unit;

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
