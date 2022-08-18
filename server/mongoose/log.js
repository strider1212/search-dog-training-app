const mongoose = require('mongoose');

const { waterSchema } = require('./water');
const { individual_runsSchema } = require('./individual_runs');

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
  }
})

const Log = mongoose.model('Log', logSchema);

module.exports = {logSchema, Log}