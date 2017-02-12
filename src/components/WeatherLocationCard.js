import React, { PropTypes } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
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
const iconAttr = data => ({
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
    <Card className="location-card">
      <CardTitle
        title={`${location.data.name}, ${location.data.sys.country}`}
        subtitle={location.data.weather[0].main}
      />
      <div className="location-card__summary">
        <div
          className="location-card__summary__icon"
          {...iconAttr(location.data)}
        />
        <div className="location-card__summary__temp">
          {location.data.main.temp}
          <span className="location-card__summary__temp__unit">°C</span>
        </div>
      </div>
      <List>
        <ListItem
          disabled
          primaryText="Minimum temperature"
          secondaryText={`${location.data.main.temp_min}°C`}
        />
        <ListItem
          disabled
          primaryText="Maximum temperature"
          secondaryText={`${location.data.main.temp_max}°C`}
        />
        <ListItem
          disabled
          primaryText="Humidity"
          secondaryText={`${location.data.main.humidity}%`}
        />
        <ListItem
          disabled
          primaryText="Pressure"
          secondaryText={`${location.data.main.pressure}hPa`}
        />
        <ListItem
          disabled
          primaryText="Wind speed"
          secondaryText={`${location.data.wind.speed}m/s`}
        />
        <ListItem
          disabled
          primaryText="Wind direction"
          secondaryText={
            location.data.wind.deg ? `${location.data.wind.deg}°` : 'N/A'
          }
        />
        <ListItem
          disabled
          primaryText="Visibility"
          secondaryText={`${location.data.visibility}m`}
        />
      </List>
      <Divider />
      <List>
        <ListItem
          disabled
          primaryText="Time of data calculation"
          secondaryText={new Date(location.data.dt * 1000).toTimeString()}
        />
      </List>
      <Divider />
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
