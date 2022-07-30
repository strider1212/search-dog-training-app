const express = require('express');
const router = express.Router();

const { Log } = require('../mongoose/log')

router.post('/', (req, res) => {
  let postLog = new Log({
    //populated automatically in the front end
    "log_created_by": req.query.log_created_by,
    //formatted for weather API
    "date": req.query.date,
    //formatted for weather API
    "time": req.query.time,
    //formatted for weather API
    "address": req.query.address,
    //teamID
    "team": req.query.team,
    "training_type": req.query.training_type,
    "training_hours": req.query.training_hours,
    "travel_hours": req.query.travel_hours,
    //self-calculate on the front-end
    "aggregate_hours": req.query.aggregate_hours,
    //perhaps use maps API to calculate on the front end
    "mileage": req.query.mileage,
    "tolls": req.query.tolls,
    "time_of_day": req.query.time_of_day,
    //self-populated with weather API
    "weather": req.query.weather,
    //weather API
    "temperature": req.query.temperature,
    //weather API
    "wind_speed": req.query.wind_speed,
    //weather API
    "humidity": req.query.humidity,
    "placement_description": req.query.placement_description,
    //ID of user
    //select from available users 
    "placed_by": req.query.placed_by,
    "scent_source": req.query.scent_source,
    "source_container": req.query.source_container,
    "water": req.query.water
    //water_data and inidividual_runs aren't going to be posted with this individual post they will be added on their own
  })
  postLog.save();
  res.status(201).send(postLog);
})

router.get('/', (req, res) => {
  Log.find({}, (err, logs) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
    }

   if (logs) {
    res.status(200).send(logs)
    return
   }

   console.error('how did we get here?')

  })
})

router.get('/:id', (req, res) => {
  //require id be 24 characters on the front end
  const id = req.params.id;
  Log.findById(id, (err, log) =>{
    if (err) {
       console.error(err)
       res.status(404).end()
       return
    }
  
    if (log) {
       res.status(200).send(log)
       return
    }
  
    console.error('how did we get here?')
  })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const key = req.query.key;
  const value = req.query.value;

  if (
    key !== 'log_created_by' && 
    key !== 'date' && 
    key !== 'address' && 
    key !== 'team' && 
    key !== 'training_type' && 
    key !== 'training_hours' && 
    key !== 'travel_hours' &&
    key !== 'aggregate_hours' &&
    key !== 'mileage' &&
    key !== 'tolls' &&
    key !== 'time_of_day' &&
    key !== 'weather' &&
    key !== 'temperature' &&
    key !== 'wind_speed' &&
    key !== 'humidity' &&
    key !== 'placement_description' &&
    key !== 'placed_by' &&
    key !== 'scent_source' &&
    key !== 'source_container' &&
    key !== 'time' &&
    key !== 'water' &&
    key !== 'water_data' &&
    key !== 'individual_runs') {
    console.error("Key must match userSchema.")
    res.status(404).end()
    return
  }

  Log.findByIdAndUpdate(id, {[key]: value}, {new: true, lean: true}, (err, updatedLog) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
   }

    if (key === 'individual_runs') {
      res.status(404).send('Cannot update this category in this way. Can only add or delete.')
      return
    }

    if (updatedLog) {
      res.status(200).send(updatedLog)
      return
    }
    
   console.error('how did we get here?')
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Log.findByIdAndDelete(id, (err, log) => {
    if (err) {
      console.error(err)
      res.status(400).end()
      return
    }

    if (log) {
      res.status(200).send(`Log #${log._id} was deleted.`)
      return
    }
  })
})

module.exports = router;