import React from 'react';
import {Router} from 'react-router';
import {Route} from 'react-router';
import {IndexRoute} from 'react-router';
import {browserHistory} from 'react-router';

import Main from '../components/Main';
import HomeContainer from '../components/containers/HomeContainer';
import Forecast from '../components/pages/ForecastComponent';
import Detail from '../components/pages/DetailComponent';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
        <IndexRoute component={HomeContainer} />
        <Route path='/forecast' component={Forecast} />
        <Route path='/detail' component={Detail} />
    </Route>
  </Router>
);

export default routes;
