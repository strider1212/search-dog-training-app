const express = require('express');
const router = express.Router();

const { Log } = require('../mongoose/log');
const { Water } = require('../mongoose/water');
const { Individual_Runs } = require('../mongoose/individual_runs')

const { logsKeyArray } = require('../data/keyArray');
const { logsKeyMatch } = require('../data/keyMatchArray');
const getAll = require('../methodFunctions/getAll');
const postNew = require('../methodFunctions/postNew');
const getById = require('../methodFunctions/getById');
const putById = require('../methodFunctions/putById');
const deleteById = require('../methodFunctions/deleteById');
const postChildrenSchemas = require('../methodFunctions/postChildrenSchemas');

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
  putById(Log, 'logs', logsKeyMatch, logsKeyArray, req, res);
})

router.delete('/:id', (req, res) => {
  deleteById(Log, 'logs', req, res);
})

router.post('/water', async (req, res) => {
  const associatedLog = req.query.associated_log
  
  const waterLog = new Water({
    "open": req.query.open,
    "submerged": req.query.submerged,
    "depth": req.query.depth,
    "salt_water": req.query.salt_water,
    "water_type": req.query.water_type,
    "temperature": req.query.temperature,
    //log ID
    "associated_log": associatedLog
  })

  const key = 'water_data';
  const value = waterLog._id;
  const keyValuePair = {[key]: value};

  postChildrenSchemas(waterLog, Log, associatedLog, keyValuePair, res);
})

router.get('/water/:id', (req, res) => {
  getById(Water, 'item', req, res)
})

router.post('/individual_runs', async (req, res) => {
  const associatedLog = req.query.associated_log

  const logIndividual_runs = new Individual_Runs({
    //member ID
    "user": req.query.user,
    "time": req.query.time,
    "blind": req.query.blind,
    "k9": req.query.k9,
    "distractions": req.query.distractions,
    "notes": req.query.notes,
    //log ID
    "associated_log": associatedLog
  })

  const keyValuePair = {$push: {"individual_runs.children": logIndividual_runs}};

  postChildrenSchemas(logIndividual_runs, Log, associatedLog, keyValuePair, res);
})

module.exports = router;