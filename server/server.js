//general requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//routers
const users = require('./routers/users');
const teams = require('./routers/teams');
const logs = require('./routers/logs');
// const auth = require('./routers/auth');


//staging variables
const serverPort = process.env.SERVER_PORT;
console.log('env test: ', process.env.SERVER_PORT)

const connectUsername = process.env.USERNAME;
const connectPassword = process.env.PASSWORD;
const connectDatabase = process.env.DATABASE;

const ATLAS_CONNECT = `mongodb+srv://${connectUsername}:${connectPassword}@cluster0.tgm5d.mongodb.net/${connectDatabase}`;

mongoose.connect(ATLAS_CONNECT);

app.set('view-engine', 'ejs');

//middleware
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true
  })
)

//routes and methods
app.use('/users', users);
app.use('/teams', teams);
app.use('/logs', logs);
// app.use('/auth', auth);

app.listen(serverPort, () => {
  console.log(`Listening on port ${serverPort}.`)
})
