'use strict';

import React from 'react';
import PropTypes from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

require('styles/pages/Home.css');

const styles = {
  maxWidth: '400px',
  margin: '0 auto'
};

let HomeComponent = (props) => (
  <div className="home-component">
    <Card style={styles}>
      <CardMedia overlay={<CardTitle title="Enter a city" />}>
        <img src="http://lorempixel.com/600/337/nature/" />
      </CardMedia>
      <CardActions>
        <TextField
          id="location"
          hintText="New York"
          fullWidth={true}
          floatingLabelText="Location"
          floatingLabelFixed={true}
        />
      </CardActions>
      <CardActions>
        <RaisedButton
          type="submit"
          label="Get weather"
          primary={true}
          fullWidth={true}
        />
      </CardActions>
    </Card>
  </div>
);

// HomeComponent.displayName = 'PagesHomeComponent';
HomeComponent.propTypes = {
  direction: PropTypes.string,
  onSubmitCity: PropTypes.func,
  onUpdateCity: PropTypes.func,
  city: PropTypes.string
};
// HomeComponent.defaultProps = {};

export default HomeComponent;
