const mongoose = require('mongoose');
const { manualWeatherSchema } = require('../mongoose/manualWeather')

const logSchema = new mongoose.Schema({
  "log_created_by": {
    type: String, 
    required: true
  },
  "date": {
    type: Date,
    required: true
  },
  "address": {
    type: String,
    required: true
  },
  "team": {
    type: String, 
    ref: 'Team',
    required: true
  },
  "time": {
    type: 'String',
    required: true
  },
  child: manualWeatherSchema
})

const Log = mongoose.model('Log', logSchema);

module.exports = {logSchema, Log}