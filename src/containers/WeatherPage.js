import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LocationsList from '../components/WeatherLocationsList';
import * as WeatherActions from '../actions/weather';


const mapStateToProps = state => ({
  weather: state.counter,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(WeatherActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);
