//general requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

//Mongoose requirements
const { User } = require('./mongoose/user');

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
app.route('/users')
  .post(async (req, res) =>  {
    //check all field on the front end
    let postUser = new User({
      "username": req.query.username,
      "password": req.query.password,
      "firstName": req.query.firstName,
      "lastName": req.query.lastName,
      "email": req.query.email,
      "phoneNumber": req.query.phoneNumber,
      "dateCreated": new Date(),
      //query must must be formatted like
      //&k9s[]=spike&k9s[]=lucey
      "k9s": req.query.k9s
    })
    await postUser.save()
    res.sendStatus(201);
  })

app.route('/users/:id')
  .get(async (req, res) => {
    //require id be 24 characters on the front end
    const id = req.params.id;
    await User.findById(id, (err, user) => {
      res.status(201).send(user);
    }).clone().catch((err) => {console.log(err)})
  })

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})


//handle error