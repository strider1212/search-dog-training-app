const mongoose = require('mongoose');

const hoursAndStatsSchema = new mongoose.Schema({
  "travel_hours": {
    type: Number,
    required: true
  },
  "training_hours": {
    type: Number,
    required: true
  },
  "total_hours": {
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
  "associated_log": {
    type: mongoose.ObjectId,
    required: true
  }
})

const HoursAndStats = mongoose.model('HoursAndStats', hoursAndStatsSchema);

module.exports = {hoursAndStatsSchema, HoursAndStats}
