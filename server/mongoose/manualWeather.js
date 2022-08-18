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
  },
  "associated_log": {
    type: mongoose.ObjectId,
    required: true
  }
})

const ManualWeather = mongoose.model('ManualWeather', manualWeatherSchema);

module.exports = {manualWeatherSchema, ManualWeather}