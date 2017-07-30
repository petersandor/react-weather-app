import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {
  Card,
  CardActions,
  CardTitle
} from 'material-ui/Card';

// Sub views
import CardLoading from './CardLoading';

// Card stylesheet
import './WeatherLocationCard.css';


// Assign custom attributes based on passed data
const iconAttr = data => ({
  'data-icon': data.icon
});

const WeatherLocationCard = ({
  id, location, onRequestRemove, onUnitToggle
}) => {
  const units = location.units;
  const tempUnit = units ? units.temperature.toUpperCase() : location.unit;

  return location.isLoading ?
    <CardLoading /> :
    <Card className="location-card">
      <CardTitle
        title={location ? location.name : 'Not found'}
        subtitle={location ? location.currently.summary : ''}
      />
      <div className="location-card__summary">
        <div
          className="location-card__summary__icon"
          {...iconAttr(location.currently)}
        />
        <div className="location-card__summary__temp">
          {location.currently.temperature}
          <span className="location-card__summary__temp__unit">
            °{units.temperature.toUpperCase()}
          </span>
        </div>
      </div>
      <List>
        <ListItem
          disabled
          primaryText="Feels like"
          secondaryText={
            `${location.currently.apparentTemperature}°${tempUnit}`
          }
        />
        <ListItem
          disabled
          primaryText="Humidity"
          secondaryText={`${location.currently.humidity}%`}
        />
        <ListItem
          disabled
          primaryText="Pressure"
          secondaryText={`${location.currently.pressure} ${units.pressure}`}
        />
        <ListItem
          disabled
          primaryText="Wind speed"
          secondaryText={`${location.currently.windSpeed} ${units.windSpeed}`}
        />
        <ListItem
          disabled
          primaryText="Wind direction"
          secondaryText={
            `${location.currently.windDirection}`
          }
        />
        {
          location.currently.visibility ?
            <ListItem
              disabled
              primaryText="Visibility"
              secondaryText={
                `${location.currently.visibility} ${units.visibility}`
              }
            /> : ''
        }
        <ListItem
          disabled
          primaryText="Time of data calculation"
          secondaryText={location.currently.dateTime.toString()}
        />
      </List>
      <Divider />
      <List>
        <ListItem
          primaryText="Change units"
          secondaryText={`°${tempUnit}`}
          rightToggle={
            <Toggle
              onToggle={event => onUnitToggle(id, location, event)}
              toggled={location.unit !== 'C'}
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
    </Card>;
};

WeatherLocationCard.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onRequestRemove: PropTypes.func,
  onUnitToggle: PropTypes.func
};

export default WeatherLocationCard;
