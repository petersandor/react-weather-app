import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

// import googleMapsClient from '../utils/mapsApiClient';

class LocationAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autocompleteItems: []
    };

    this.autocompleteCallback = this.autocompleteCallback.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.autocompleteService = new window
      .google.maps.places
      .AutocompleteService();

    this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK;
  }

  getInputProps() {
    return {
      ...this.props.inputProps,
      onChange: event => {
        this.handleInputChange(event);
      }
    };
  }

  autocompleteCallback(predictions, status) {
    if (status !== this.autocompleteOK) {
      this.props.onError(status);

      if (this.props.clearItemsOnError) {
        this.clearAutocomplete();
      }

      this.setState({
        errorText: 'Something went wrong. Try again later'
      });

      return;
    }

    // transform snake_case to camelCase
    const formattedSuggestion = (structured_formatting) => ({
      mainText: structured_formatting.main_text,
      secondaryText: structured_formatting.secondary_text,
    });

    this.setState({
      errorText: null,
      autocompleteItems: predictions.map((p, idx) => ({
        suggestion: p.description,
        placeId: p.place_id,
        active: false,
        index: idx,
        formattedSuggestion: formattedSuggestion(p.structured_formatting),
      }))
    });
  }

  clearAutocomplete() {
    this.setState({
      autocompleteItems: []
    });
  }

  handleInputChange(value) {
    this.props.inputProps.onChange(value);

    if (!value) {
      this.clearAutocomplete();
      return;
    }

    this.autocompleteService.getPlacePredictions({ ...this.props.options,
      input: value
    }, this.autocompleteCallback);


    // TODO: CORS issue
    // https://github.com/googlemaps/google-maps-services-js/issues/59
    // googleMapsClient.placesAutoComplete({
    //   input: value,
    //   type: '(cities)'
    // })
    // .asPromise()
    // .then(data => {
    //   debugger;
    // });
  }

  render() {
    const { autocompleteItems, errorText } = this.state;
    const inputProps = this.getInputProps();
    const dataSourceConfig = {
      text: 'suggestion',
      value: 'placeId'
    };

    return (
      <AutoComplete
        id="locationInput"
        fullWidth
        openOnFocus
        errorText={errorText}
        floatingLabelText="City name"
        filter={() => true}
        dataSource={autocompleteItems}
        dataSourceConfig={dataSourceConfig}
        onUpdateInput={this.handleInputChange}
        {...inputProps}
      />
    );
  }
}

LocationAutocomplete.propTypes = {
  inputProps: (props, propName) => {
    const inputProps = props[propName];

    if (!inputProps.onChange) {
      throw new Error('\'inputProps\' must have \'onChange\'.');
    }
  },
  onError: PropTypes.func,
  clearItemsOnError: PropTypes.bool,
  options: PropTypes.shape({
    bounds: PropTypes.object,
    componentRestrictions: PropTypes.object,
    location: PropTypes.object,
    offset: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    radius: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    types: PropTypes.array
  }),
};

LocationAutocomplete.defaultProps = {
  clearItemsOnError: false,
  onError: status => console.error('[react-places-autocomplete]: error happened when fetching data from Google Maps API.\nPlease check the docs here (https://developers.google.com/maps/documentation/javascript/places#place_details_responses)\nStatus: ', status),
  options: {},
};

export default LocationAutocomplete;
