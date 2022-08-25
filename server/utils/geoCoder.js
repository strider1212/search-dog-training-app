require('dotenv').config()
const axios = require('axios');

const geoCoder = async (address) => {
  
  let splitAddress = [];

  if (typeof address === 'string') {
    splitAddress = address.split(' ')
  } else {
    console.log('not a string')
  }

  const joinedsplitAddress = splitAddress.join('+')
  

  const apikey = process.env.GOOGLE_MAPS_API_KEY;

  let lat = '';
  let lng = '';

  await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${joinedsplitAddress}&key=${apikey}`)
  .then(res => {
    lat = res.data.results[0].geometry.location.lat;
    lng = res.data.results[0].geometry.location.lng;
  })
  .catch(err => console.log(err)) 
  return {
    lat: lat,
    lng: lng
  }
}

module.exports = geoCoder;