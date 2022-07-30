const express = require('express');
const router = express.Router();

const { Log } = require('../mongoose/log')

router.post('/', (req, res) => {
  let postLog = new Log({
    "log_created_by": req.query.log_created_by,
    "date": new Date(),
    "address": req.query.address,
    //teamID
    "team": req.query.team,
    "training_type": req.query.training_type,
    "traing_hours": req.query.traing_hours,
    "travel_hours": req.query.travel_hours,
    "aggregate_hours": req.query.aggregate_hours,
    "mileage": req.query.mileage,
    "tolls": req.query.tolls,
    "time_of_day": req.query.time_of_day,
    "weather": req.query.weather,
    "temperature": req.query.temperature,
    "wind_speed": req.query.wind_speed,
    "humidity": req.query.humidity,
    "placement_descpription": req.query.placement_descpription,
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
      type: Date,
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
      children: [memberSchema],
      required: false
    }
  })
  console.log('connected')
  res.end()
})

module.exports = router;