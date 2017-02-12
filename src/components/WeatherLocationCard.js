import React, { PropTypes } from 'react';
import tuc from 'temp-units-conv';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
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

// Naive temp unit conversion (default is Celsius for API calls)
// TODO: redesign the whole damn thing so it will launch a new request
// with desired unit as a URL parameter so all this nonsense can be avoided
// TODO 0.1: also keep the previous data and replace only if the calc date is !=
const convertUnit = (number, targetUnit, sourceUnit = 'C') => {
  if (sourceUnit === targetUnit) {
    return number;
  }

  if (targetUnit === 'F') {
    return tuc.c2f(number);
  }

  if (targetUnit === 'C') {
    return tuc.f2c(number);
  }

  return number;
};

const WeatherLocationCard = ({
  id, location, onRequestRemove, onUnitToggle
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
          {convertUnit(location.data.main.temp, location.unit)}
          <span className="location-card__summary__temp__unit">
            °{location.unit}
          </span>
        </div>
      </div>
      <List>
        <ListItem
          disabled
          primaryText="Minimum temperature"
          secondaryText={
            `${convertUnit(location.data.main.temp_min, location.unit)}°${location.unit}`
          }
        />
        <ListItem
          disabled
          primaryText="Maximum temperature"
          secondaryText={
            `${convertUnit(location.data.main.temp_max, location.unit)}°${location.unit}`
          }
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
        <ListItem
          disabled
          primaryText="Time of data calculation"
          secondaryText={new Date(location.data.dt * 1000).toTimeString()}
        />
      </List>
      <Divider />
      <List>
        <ListItem
          primaryText="Toggle units"
          secondaryText={`${location.unit}°`}
          rightToggle={
            <Toggle
              onToggle={event => onUnitToggle(id, event)}
              toggled={location.unit === 'F'}
            />
          }
        />
      </List>
      <Divider />
      <CardActions>
        <FlatButton
          label="Remove"
          onTouchTap={() => onRequestRemove(id)}
        />
      </CardActions>
    </Card>
);

WeatherLocationCard.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onRequestRemove: PropTypes.func,
  onUnitToggle: PropTypes.func
};

export default WeatherLocationCard;
