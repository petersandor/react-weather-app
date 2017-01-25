import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const appBarStyles = {
  marginBottom: 20
};

const Main = ({ children }) => (
  <div>
    <AppBar
      title="Weather"
      showMenuIconButton={false}
      style={appBarStyles}
      zDepth={2}
    />
    {children}
  </div>
);

Main.propTypes = {
  children: PropTypes.element.isRequired,
};


export default Main;
