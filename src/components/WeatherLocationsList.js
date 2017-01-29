import React, { PropTypes } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SnackBar from 'material-ui/Snackbar';

import WeatherLocationCard from '../components/WeatherLocationCard';

const listStyles = {
  margin: '0 10'
};

const addButtonStyles = {
  position: 'fixed',
  bottom: 20,
  right: 20
};

const WeatherLocationsList = ({
  addLocation, removeLocation, weather
}) => (
  <div style={listStyles}>
    {weather.locations.map((location) =>
      <WeatherLocationCard
        location={location}
        onRequestRemove={removeLocation}
        key={location.id}
      />)}

    <FloatingActionButton
      style={addButtonStyles}
      onTouchTap={() => addLocation({ cityName: 'Prague' })}
    >
      <ContentAdd />
    </FloatingActionButton>

    <SnackBar
      open={!weather.isGeolocationAvailable}
      message="Geolocation not available"
      onRequestClose={() => false}
    />
  </div>
);

WeatherLocationsList.propTypes = {
  addLocation: PropTypes.func.isRequired,
  removeLocation: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired
};

export default WeatherLocationsList;
