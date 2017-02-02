import React, { PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardActions,
  CardTitle,
  CardText
} from 'material-ui/Card';

// Card stylesheet
import './WeatherLocationCard.css';


// Assign custom attributes based on passed data
const customAttributes = data => ({
  'data-icon': data.weather[0].icon
});

const WeatherLocationCard = ({
  location, onRequestRemove
}) => (
  location.isLoading ?
    <Card className="location-card">
      <CardText style={{ textAlign: 'center' }}>
        <CircularProgress />
      </CardText>
    </Card> :
    <Card className="location-card" {...customAttributes(location.data)}>
      <CardTitle
        title={`${location.data.name}, ${location.data.sys.country}`}
        subtitle={location.data.weather[0].main}
      />
      <CardText>
        <div className="location-card__temp">{location.data.main.temp}°C</div>
      </CardText>
      <CardActions>
        <FlatButton
          label="Remove"
          onTouchTap={() => onRequestRemove(location.id)}
        />
      </CardActions>
    </Card>
);

WeatherLocationCard.propTypes = {
  location: PropTypes.object.isRequired,
  onRequestRemove: PropTypes.func
};

export default WeatherLocationCard;
