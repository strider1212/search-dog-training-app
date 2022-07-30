const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({
  "open": Boolean,
  "submerged": Boolean,
  "depth": Number,
  "salt_water": Boolean,
  "water_type": String,
  "temperature": Number
})

const Water = mongoose.model('Water', waterSchema);

module.exports = {waterSchema, Water}