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
const postChildForms = require('../methodFunctions/postChildForms');
const geoCoder = require('../utils/geoCoder');
const getDifferenceInHours = require('../utils/getDifferenceInHours');

const auth = require('./auth');
const requireAuth = auth.requireAuth;

//--------------------------------------------------------
//tomorrow.io


router.get('/weather', async (req, res) => {
  const date = req.query.date;
  const time = req.query.time;

  const inputLocation = await geoCoder(req.query.location)

  const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
  const apikey = process.env.TOMORROW_IO_KEY;
  let location = [inputLocation.lat, inputLocation.lng]
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
  const startTime = moment.utc(now).add(getDifferenceInHours(date, time), "hours").toISOString();
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

router.post('/', requireAuth, async (req, res) => {
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
    "training_info": req.body.trainingInfoLog,
    "water": req.body.water,
    "individual_runs": req.body.individual_runs
  })
  postNew(postLog, res);
  console.log('POST to /');
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

router.post('/individual_runs', async (req, res) => {
  const Individual_runsLog = new Individual_Runs({
    //member ID
    "time": req.body.time,
    "blind": req.body.blind,
    "k9": req.body.k9,
    "distractions": req.body.distractions,
    "notes": req.body.notes,
    //log ID
    "associated_log": req.body.associatedLog
  })

  postChildForms(req, res, Individual_runsLog, "individual_runs")
})

router.post('/water', requireAuth, async (req, res) => {
  const waterLog = new Water({
    "open": req.body.open,
    "submerged": req.body.submerged,
    "depth": req.body.depth,
    "salt_water": req.body.salt_water,
    "water_type": req.body.water_type,
    "temperature": req.body.temperature,
    "associated_log": req.body.associatedLog
  })

  postChildForms(req, res, waterLog, "water");
})

router.post('/trainingInfo', requireAuth, async (req, res) => {
  
  const trainingInfoLog = new TrainingInfo({
    "training_type": req.body.training_type,
    "placement_description": req.body.placement_description,
    "placed_by": req.body.placed_by,
    "scent_source": req.body.scent_source,
    "source_container": req.body.source_container,
    "water": req.body.water,
    "associated_log": req.body.associatedLog
  })

  postChildForms(req, res, trainingInfoLog, "training_info");
})

router.post('/hoursAndStats', requireAuth, async (req, res) => {
  
  const hoursAndStatsLog = new HoursAndStats({
    "travel_hours": req.body.travel_hours,
    "training_hours": req.body.training_hours,
    "total_hours": req.body.total_hours,
    "mileage": req.body.mileage,
    "tolls": req.body.tolls,
    "associated_log": req.body.associatedLog
  })

  postChildForms(req, res, hoursAndStatsLog, "hours_and_stats");
})

router.post('/manualWeather', requireAuth, async (req, res) => {
  const manualWeatherLog = new ManualWeather({
    "weather": req.body.weather,
    "temperature":req.body.temperature,
    "wind_speed":req.body.wind_speed,
    "humidity":req.body.humidity,
    "associated_log":req.body.associatedLog
  })
  postChildForms(req, res, manualWeatherLog, "weather");
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
