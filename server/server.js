const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path: '../.env'});

const { User } = require('./mongoose/user');

const ATLAS_CONNECT = process.env.ATLAS_CONNECT;
const PORT = 3000;

mongoose.connect(ATLAS_CONNECT);

app.use(express.json())

//test comment

app.route('/users/:id')
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



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})