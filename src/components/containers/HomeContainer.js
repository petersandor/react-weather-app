'use strict';

import React from 'react';
import PropTypes from 'react';
import Home from '../pages/HomeComponent';

class HomeContainer extends React.Component {

  render() {
    return (
      <Home />
    );
  }
}

HomeContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default HomeContainer;
