import React, { PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardActions,
  CardTitle,
  CardText
} from 'material-ui/Card';

const cardStyles = {
  width: 300,
  minHeight: 200,
  display: 'inline-block',
  margin: '0 10px 10px'
};

const WeatherLocationCard = ({
  location, onRequestRemove
}) => (
  location.isLoading ?
    <Card style={cardStyles}>
      <CardText style={{ textAlign: 'center' }}>
        <CircularProgress />
      </CardText>
    </Card> :
    <Card style={cardStyles}>
      <CardTitle
        title={`${location.data.name}, ${location.data.sys.country}`}
        subtitle={location.data.weather[0].main}
      />
      <CardText>
        <div>
          <span style={{ fontSize: '3em' }}>
            {location.data.main.temp}°C
          </span>
        </div>
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
