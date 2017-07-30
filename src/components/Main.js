import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';

import './Main.css';


const projectLink = () =>
  <a
    href={'https://github.com/petersandor/react-weather-app'}
    rel="noopener noreferrer"
    target="_blank"
    className="app-bar__link--github"
  >See on GitHub</a>;

const Main = ({ children }) => (
  <div>
    <AppBar
      title="Weather"
      className="app-bar"
      showMenuIconButton={false}
      iconElementRight={projectLink()}
      iconStyleRight={{ marginRight: 0, marginTop: 16 }}
      zDepth={2}
    />
    {children}
  </div>
);

Main.propTypes = {
  children: PropTypes.element.isRequired,
};


export default Main;
