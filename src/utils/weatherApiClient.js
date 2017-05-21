import DarkSky from 'dark-sky-api';

// Hardcode the key here in the client since we have no API proxy
// and there are no alternative APIs that do not require keys (and are free)
// if you know about some, please let me know
DarkSky.apiKey = '394d3340d5fb35ab845beffae8aa4be8';
DarkSky.units = 'si';

export default DarkSky;
