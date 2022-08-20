require('dotenv').config()
const axios = require('axios');

const geoCoder = async () => {
  const apikey = process.env.GOOGLE_MAPS_API_KEY;

  let lat = '';
  let lng = '';

  await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=196+Green+Giant+Rd,+Townsend,+DE&key=${apikey}`)
  .then(res => {
    console.log(res.data.results[0].geometry.location.lat)
    lat = res.data.results[0].geometry.location.lat;
    long = res.data.results[0].geometry.location.lng;
  })
  return {
    lat: lat,
    lng: lng
  }
}

geoCoder()

module.exports = geoCoder;