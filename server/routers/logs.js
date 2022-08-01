const express = require('express');
const router = express.Router();

const { Log } = require('../mongoose/log');

const { logsKeyArray } = require('../data/keyArray');
const { logsKeyMatch } = require('../data/keyMatchArray');
const keyChecker = require('../utils/keyChecker');
const arrayKeyChecker = require('../utils/arrayKeyChecker');
const getAll = require('../methodFunctions/getAll');
const postNew = require('../methodFunctions/postNew');
const getById = require('../methodFunctions/getById');
const putById = require('../methodFunctions/putById');
const deleteById = require('../methodFunctions/deleteById');

router.get('/', (req, res) => {
  getAll(Log, 'logs', req, res);
})

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
  postNew(postLog, Log, req, res);
})

router.get('/:id', (req, res) => {
  getById(Log, 'logs', req, res);
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const key = req.query.key;
  const value = req.query.value;

  if (arrayKeyChecker(logsKeyMatch, key)) {
    res.status(404).send('Cannot update this category in this way. Can only add or delete.')
    return
  }
  
  if (!keyChecker(key, logsKeyArray)) {
    console.error("Key must match userSchema.")
    res.status(404).end()
    return
  }

  putById(id, key, value, Log, 'logs', req, res);
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  deleteById(id, Log, 'logs', req, res);
})

module.exports = router;