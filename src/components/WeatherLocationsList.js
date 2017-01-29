import React, { PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SnackBar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
  removeLocation,
  openNewLocationDialog,
  closeNewLocationDialog,
  changeInputLocation,
  weather
}) => (
  <div style={listStyles}>
    {
      /* Render a card for each location */
      weather.locations.map(location =>
        <WeatherLocationCard
          location={location}
          onRequestRemove={removeLocation}
          key={location.id}
        />)
    }

    {/* Fixed button for adding locations at bottom right  */}
    <FloatingActionButton
      style={addButtonStyles}
      onTouchTap={openNewLocationDialog}
    >
      <ContentAdd />
    </FloatingActionButton>

    {/* Geolocation not available message at the bottom */}
    <SnackBar
      open={!weather.isGeolocationAvailable}
      message="Geolocation not available"
      onRequestClose={() => false}
    />

    {/* Dialog for adding new locations */}
    <Dialog
      title="Add city"
      open={weather.isNewLocationModalOpen}
      actions={[
        <FlatButton
          label="Cancel"
          primary
          onTouchTap={closeNewLocationDialog}
        />,
        <FlatButton
          label="Submit"
          primary
          onTouchTap={() => closeNewLocationDialog({
            type: 'SUBMIT',
            value: weather.cityInputValue
          })}
        />]
      }
    >
      <TextField
        id="newCityInput"
        fullWidth
        onChange={changeInputLocation}
      />
    </Dialog>
  </div>
);

WeatherLocationsList.propTypes = {
  removeLocation: PropTypes.func.isRequired,
  openNewLocationDialog: PropTypes.func,
  closeNewLocationDialog: PropTypes.func,
  changeInputLocation: PropTypes.func,
  weather: PropTypes.object.isRequired
};

export default WeatherLocationsList;
