import weather from 'openweather-apis';

// Hardcode the key here in the client since we have no API proxy
// and there are no alternative APIs that do not require keys (and are free)
// if you know about some, please let me know
const API_KEY = 'a7526a7fa2def7481e47ebb039a9cae9';

// Set the basics
weather.setLang('en');
weather.setAPPID(API_KEY);

export default weather;
