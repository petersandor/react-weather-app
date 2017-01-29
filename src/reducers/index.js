import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import weather from './weather';


const rootReducer = combineReducers({
  weather,
  routing,
});


export default rootReducer;
