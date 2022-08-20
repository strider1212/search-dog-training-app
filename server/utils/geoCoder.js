const {Client} = require("@googlemaps/google-maps-services-js");
require('dotenv').config()
const axios = require('axios');

const geoCoder = async () => {
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=196+Green+Giant+Rd,+Townsend,+DE&key=${apikey}`)
  .then(res => {
    console.log(res.data.results[0].geometry.location)
  })

}

geoCoder()

module.exports = geoCoder;