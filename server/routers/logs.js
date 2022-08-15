require('dotenv').config()
const express = require('express');
const router = express.Router();

const { Log } = require('../mongoose/log');
const { Water } = require('../mongoose/water');
const { Individual_Runs } = require('../mongoose/individual_runs')

const { logsKeyArray } = require('../data/keyArray');
const { logsKeyMatch } = require('../data/keyMatchArray');
const { waterKeyArray } = require('../data/keyArray');
const { individual_runsKeyArray } = require('../data/keyArray');
const getAll = require('../methodFunctions/getAll');
const postNew = require('../methodFunctions/postNew');
const getById = require('../methodFunctions/getById');
const putById = require('../methodFunctions/putById');
const deleteById = require('../methodFunctions/deleteById');
const postChildrenSchemas = require('../methodFunctions/postChildrenSchemas');

const weatherAPIKey = process.env.TOMORROW_IO_KEY;
let location = [40.758, -73.9855];
const fields = [
  "precipitationIntensity",
  "precipitationType",
  "windSpeed",
  "windGust",
  "windDirection",
  "temperature",
  "temperatureApparent",
  "cloudCover",
  "cloudBase",
  "cloudCeiling",
  "weatherCode",
];
const units = "imperial";
const timesteps = ["current", "1h", "1d"];
const now = moment.utc();
const startTime = moment.utc(now).add(0, "minutes").toISOString();
const endTime = moment.utc(now).add(1, "days").toISOString();

router.get('/', (req, res) => {
  getAll(Log, res);
})

router.post('/', (req, res) => {
  console.log('POST to /')
  let postLog = new Log({
    //populated automatically in the front end
    "log_created_by": req.body.log_created_by,
    //formatted for weather API
    "date": req.body.date,
    //formatted for weather API
    "time": req.body.time,
    //formatted for weather API
    "address": req.body.address,
    //teamID
    "team": req.body.team,
    "training_type": req.body.training_type,
    "training_hours": req.body.training_hours,
    "travel_hours": req.body.travel_hours,
    //self-calculate on the front-end
    "aggregate_hours": req.body.aggregate_hours,
    //perhaps use maps API to calculate on the front end
    "mileage": req.body.mileage,
    "tolls": req.body.tolls,
    //self-populated with weather API
    "weather": req.body.weather,
    //weather API
    "temperature": req.body.temperature,
    //weather API
    "wind_speed": req.body.wind_speed,
    //weather API
    "humidity": req.body.humidity,
    "placement_description": req.body.placement_description,
    //ID of user
    //select from available users 
    "placed_by": req.body.placed_by,
    "scent_source": req.body.scent_source,
    "source_container": req.body.source_container,
    "water": req.body.water
    //water_data and inidividual_runs aren't going to be posted with this individual post they will be added on their own
  })
  postNew(postLog, res);
})

router.get('/:id', (req, res) => {
  getById(Log, req, res);
})

router.put('/:id', (req, res) => {
  putById(Log, logsKeyMatch, logsKeyArray, req, res);
})

router.delete('/:id', (req, res) => {
  deleteById(Log, req, res);
})

router.post('/water', async (req, res) => {
  const associatedLog = '62f53c46105ec01ba30ab9f2'
  
  const waterLog = new Water({
    "open": req.body.open,
    "submerged": req.body.submerged,
    "depth": req.body.depth,
    "salt_water": req.body.salt_water,
    "water_type": req.body.water_type,
    "temperature": req.body.temperature,
    "associated_log": req.body.associated_log
  })

  const key = 'water_data';
  const value = waterLog._id;
  const keyValuePair = {[key]: value};

  postChildrenSchemas(waterLog, Log, associatedLog, keyValuePair, res);
})

router.get('/water/:id', (req, res) => {
  getById(Water, req, res)
})

router.put('/water/:id', (req, res) => {
  putById(Water, [], waterKeyArray, req, res)
})

router.delete('/water/:id', (req, res) => {
  deleteById(Water, req, res)
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

router.get('/individual_runs/:id', (req, res) => {
  getById(Individual_Runs, req, res)
})

router.put('/individual_runs/:id', (req, res) => {
  putById(Individual_Runs, [], individual_runsKeyArray, req, res)
})

router.delete('/individual_runs/:id', (req, res) => {
  deleteById(Individual_Runs, req, res)
})

module.exports = router;