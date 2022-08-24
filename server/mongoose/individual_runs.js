const mongoose = require('mongoose');

const individual_runsSchema = new mongoose.Schema({
  "time": {
    type: String,
    required: true
  },
  "blind": {
    type: Boolean,
    required: true
  },
  "k9": {
    type: String,
    required: true
  },
  "distractions": {
    type: String,
    required: true
  },
  "notes": {
    type: String,
    required: true
  },
  "associated_log": {
    type: mongoose.ObjectId,
    required: true
  }
});

const Individual_Runs = mongoose.model('Individual_Runs', individual_runsSchema);

module.exports = {individual_runsSchema, Individual_Runs}