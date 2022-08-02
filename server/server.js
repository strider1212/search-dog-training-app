//general requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});
var passport = require('passport');
var LocalStrategy = require('passport-local');

//routers
const users = require('./routers/users');
const teams = require('./routers/teams')
const logs = require('./routers/logs')

//.env imports
const connectUsername = process.env.USERNAME;
const connectPassword = process.env.PASSWORD;
const connectDatabase = process.env.DATABASE;

//staging variables
const ATLAS_CONNECT = `mongodb+srv://${connectUsername}:${connectPassword}@cluster0.tgm5d.mongodb.net/${connectDatabase}`;
const PORT = 3000;

mongoose.connect(ATLAS_CONNECT);

//middleware
app.use(express.json())

//routes and methods
app.use('/users', users);
app.use('/teams', teams);
app.use('/logs', logs)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})