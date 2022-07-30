const express = require('express');
const router = express.Router();

const { Log } = require('../mongoose/log')

router.post('/', (req, res) => {
  let postLog = new Log({
    "log_created_by": req.query.log_created_by,
    "date": req.query.date,
    "address": req.query.address,
    //teamID
    "team": req.query.team,
    "training_type": req.query.training_type,
    "traing_hours": req.query.traing_hours,
    "travel_hours": req.query.travel_hours,
    //self-calculate on the front-end
    "aggregate_hours": req.query.aggregate_hours,
    //perhaps use maps API to calculate on the front end
    "mileage": req.query.mileage,
    "tolls": req.query.tolls,
    "time_of_day": req.query.time_of_day,
    //self-populated with weather API
    "weather": req.query.weather,
    "temperature": req.query.temperature,
    "wind_speed": req.query.wind_speed,
    "humidity": req.query.humidity,
    "placement_descpription": req.query.placement_descpription,
    "placed_by": req.query.placed_by,
    "scent_source": req.query.scent_source,
    "source_container": req.query.source_container,
    "time": req.query.time,
    "water": req.query,
    //water_data and inidividual_runs aren't going to be posted with this individual post they will be added on their own
  })
  postLog.save();
  res.status(201).send(postLog);
})

module.exports = router;