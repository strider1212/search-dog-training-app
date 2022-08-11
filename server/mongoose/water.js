const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
  "open": {
    type: Boolean,
    required: true
  },
  "submerged": {
    type: Boolean,
    required: true
  },
  "depth": {
    type: Number,
    required: true
  },
  "salt_water": {
    type: Boolean,
    required: true
  },
  "water_type": {
    type: String,
    required: true
  },
  "temperature": {
    type: Number,
    required: true
  }
  //add associated log
})

const Water = mongoose.model('Water', waterSchema);

module.exports = {waterSchema, Water}