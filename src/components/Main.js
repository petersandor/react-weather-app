require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {
//   yellow500,
//   yellow400,
//   yellow700,
//   yellowA200,
//   yellow100,
//   darkBlack
// } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: yellow500,
//     primary2Color: yellow700,
//     primary3Color: yellow400,
//     accent1Color: yellowA200,
//     accent2Color: yellow100,
//     accent3Color: yellow500,
//     textColor: darkBlack
//   }
// });

class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="index">
          <AppBar
            title="Weather App"
            showMenuIconButton={false}
          />
          {React.cloneElement(
            this.props.children,
            {key: this.props.location.pathname}
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
