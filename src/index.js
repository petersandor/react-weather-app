import 'core-js/fn/object/assign';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './config/routes';

// This dependency is temporary and will go away
// once the official React version is released
injectTapEventPlugin();

// Render the main component into the dom
ReactDOM.render(routes, document.getElementById('app'));
