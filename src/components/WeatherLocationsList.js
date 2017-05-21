import React, { PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import SnackBar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import WeatherLocationCard from '../components/WeatherLocationCard';
import LocationAutocomplete from '../components/LocationAutocomplete';

const listStyles = {};

const addButtonStyles = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 2
};

const WeatherLocationsList = ({
  toggleLocationUnit,
  removeLocation,
  openNewLocationDialog,
  closeNewLocationDialog,
  changeInputLocation,
  weather
}) => (
  <div style={listStyles}>
    {
      /* Render a card for each location */
      weather.locations.allIds.map(locId =>
        <WeatherLocationCard
          location={weather.locations.byId[locId]}
          onRequestRemove={removeLocation}
          onUnitToggle={toggleLocationUnit}
          key={locId}
          id={locId}
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
      <LocationAutocomplete
        clearItemsOnError
        inputProps={{
          searchText: '',
          onChange: changeInputLocation
        }}
        options={{
          types: ['(cities)']
        }}
      />
    </Dialog>
  </div>
);

WeatherLocationsList.propTypes = {
  toggleLocationUnit: PropTypes.func.isRequired,
  removeLocation: PropTypes.func.isRequired,
  openNewLocationDialog: PropTypes.func,
  closeNewLocationDialog: PropTypes.func,
  changeInputLocation: PropTypes.func,
  weather: PropTypes.object.isRequired
};

export default WeatherLocationsList;
