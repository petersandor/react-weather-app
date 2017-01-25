import React, { PropTypes } from 'react';

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
  // increment, incrementIfOdd, incrementAsync, decrement, counter,
}) => (
  <div style={listStyles}>
    <WeatherLocationCard />
    <WeatherLocationCard />
    <WeatherLocationCard />
    <WeatherLocationCard />

    <FloatingActionButton style={addButtonStyles}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

// Counter.propTypes = {
//   increment: PropTypes.func.isRequired,
//   incrementIfOdd: PropTypes.func.isRequired,
//   incrementAsync: PropTypes.func.isRequired,
//   decrement: PropTypes.func.isRequired,
//   counter: PropTypes.number.isRequired,
// };

export default WeatherLocationsList;
