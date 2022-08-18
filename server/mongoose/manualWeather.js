const mongoose = require('mongoose');

const manualWeatherSchema = new mongoose.Schema({
  "weather": {
    type: String,
    required: true
  },
  "temperature": {
    type: Number,
    required: true
  },
  "wind_speed": {
    type: String,
    required: true
  },
  "humidity": {
    type: String,
    required: true
  }
})

const Log = mongoose.model('Log', logSchema);

module.exports = {logSchema, Log}