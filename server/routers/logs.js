require('dotenv').config()
const express = require('express');
const router = express.Router();

//for weather API
const fetch = require("node-fetch");
const queryString = require('query-string');
const moment = require("moment");

const { Log } = require('../mongoose/log');
const { Water } = require('../mongoose/water');
const { ManualWeather } = require('../mongoose/manualWeather');
const { HoursAndStats } = require('../mongoose/hoursAndStats');
const { Individual_Runs } = require('../mongoose/individual_runs');
const { TrainingInfo } = require('../mongoose/trainingInfo');

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

//--------------------------------------------------------
//tomorrow.io


router.get('/weather', async (req, res) => {

  const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
  const apikey = process.env.TOMORROW_IO_KEY;
  let location = [66.94093459251725, -139.00253055000704]
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
    "humidity"
  ];
  const units = "imperial";
  const timesteps = ["1h"];
  const now = moment.utc();
  const startTime = moment.utc(now).add(-6, "hours").toISOString();
  const endTime = moment.utc(now).add(0, "minutes").toISOString();
  const timezone = "America/New_York";

  const getTimelineParameters =  queryString.stringify({
    apikey,
    location,
    fields,
    units,
    timesteps,
    startTime,
    endTime,
    timezone,
  }, {arrayFormat: "comma"});

  let dataHolder = '';

  await fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true})
  .then((result) => result.json())
  .then((json) => {
    const data = json.data.timelines[0].intervals;
    dataHolder = data
  })
  .catch((error) => console.error("error: " + error))

  res.send(dataHolder);
})

//tomorrow.io
////--------------------------------------------------------

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
    "weather": req.body.weather,
    "hours_and_stats": req.body.hoursAndStats,
    "training_info": req.body.trainingInfoLog
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

router.post('/trainingInfo', async (req, res) => {
  
  const trainingInfoLog = new TrainingInfo({
    "training_type": req.body.training_type,
    "placement_description": req.body.placement_description,
    "placed_by": req.body.placed_by,
    "scent_source": req.body.scent_source,
    "source_container": req.body.source_container,
    "water": req.body.water,
    "associated_log": req.body.associated_log
  })

  const key = 'training_info';
  const value = trainingInfoLog._id;
  const keyValuePair = {[key]: value};

  await postChildrenSchemas(trainingInfoLog, Log, req.body.associated_log, keyValuePair, res);
  await Log.findByIdAndUpdate(req.body.associated_log, {"training_info": trainingInfoLog})
})

router.post('/hoursAndStats', async (req, res) => {
  
  const hoursAndStatsLog = new HoursAndStats({
    "travel_hours": req.body.travel_hours,
    "training_hours": req.body.training_hours,
    "total_hours": req.body.total_hours,
    "mileage": req.body.mileage,
    "tolls": req.body.tolls,
    "associated_log": req.body.associatedLog
  })

  const key = 'hours_and_stats';
  const value = hoursAndStatsLog;
  const keyValuePair = {[key]: value};

  await postChildrenSchemas(hoursAndStatsLog, Log, req.body.associatedLog, keyValuePair, res);
  await Log.findByIdAndUpdate(req.body.associatedLog, {"hours_and_stats": hoursAndStatsLog})
})

router.post('/manualWeather', async (req, res) => {
  const manualWeatherLog = new ManualWeather({
    "weather": req.body.weather,
    "temperature":req.body.temperature,
    "wind_speed":req.body.wind_speed,
    "humidity":req.body.humidity,
    "associated_log":req.body.associatedLog
  })

  const key = 'manual_weather';
  const value = manualWeatherLog._id;
  const keyValuePair = {[key]: value};

  await postChildrenSchemas(manualWeatherLog, Log, req.body.associatedLog, keyValuePair, res);
  await Log.findByIdAndUpdate(req.body.associatedLog, {"weather": manualWeatherLog})
})



router.post('/water', async (req, res) => {
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

  await postChildrenSchemas(waterLog, Log, req.body.associated_log, keyValuePair, res);
  await Log.findByIdAndUpdate(req.body.associated_log, {"water": waterLog})
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
