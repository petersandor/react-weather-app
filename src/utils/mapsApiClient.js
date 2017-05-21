import q from 'q';

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBiIU3nsys1EioldebO-LlHL7sEShaB9as',
  Promise: q.Promise
});

export default googleMapsClient;
