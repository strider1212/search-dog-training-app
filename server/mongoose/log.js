const mongoose = require('mongoose');

const { waterSchema } = require('./water');
const { individual_runsSchema } = require('./individual_runs');

const logSchema = new mongoose.Schema({
  "log_created_by": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
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
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team',
    required: true
  },
  "training_type": {
    type: String,
    required: false
  },
  "training_hours": {
    type: Number, 
    required: true
  },
  "travel_hours": {
    type: Number,
    required: true
  },
  "aggregate_hours": {
    type: Number,
    required: true
  },
  "mileage": {
    type: Number,
    required: true
  },
  "tolls": {
    type: Number,
    required: true
  },
  "time_of_day": {
    type: String,
    required: true
  },
  "weather": {
    type: String,
    required: true
  },
  "temperature": {
    type: String,
    required: true
  },
  "wind_speed": {
    type: String,
    required: true
  },
  "humidity": {
    type: Number,
    required: true
  },
  "placement_description": {
    type: String,
    required: true
  },
  "placed_by": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  "scent_source": {
    type: String,
    required: true
  },
  "source_container": {
    type: String,
    required: true
  },
  "time": {
    type: 'String',
    required: true
  },
  "water": {
    type: Boolean,
    required: true
  },
  "water_data": {
    child: waterSchema,
    required: false
  },
  "individual_runs": {
    children: [individual_runsSchema],
    required: false
  }
})

const Log = mongoose.model('Log', logSchema);

module.exports = {logSchema, Log}