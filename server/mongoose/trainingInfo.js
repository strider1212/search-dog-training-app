const mongoose = require('mongoose');

const trainingInfoSchema = new mongoose.Schema({
  "training_type": {
    type: String,
    required: true
  },
  "placement_description": {
    type: String,
    required: true
  },
  "placed_by": {
    type: String,
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
  "water": {
    type: Boolean,
    required: true
  },
  "associated_log": {
    type: mongoose.ObjectId,
    required: true
  }
})

const TrainingInfo = mongoose.model('TrainingInfo', trainingInfoSchema);

module.exports = {trainingInfoSchema, TrainingInfo}