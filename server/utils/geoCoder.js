const {Client} = require("@googlemaps/google-maps-services-js");
require('dotenv').config()

const geoCoder = () => {
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  const client = new Client({});
}

module.exports = geoCoder;