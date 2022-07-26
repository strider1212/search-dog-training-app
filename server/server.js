const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://strider1212:KtZxygIgOzheV762@cluster0.tgm5d.mongodb.net/search-dog-test');

const PORT = 3000;

app.use(express.json())

//instantiate model inside of application
//impliment in post function using the model
  //get to work first
  //then get to work with user input
//test
//make modular


const userSchema = new mongoose.Schema({
  "username": {
    type: String,
    required: true
  },
  "password": {
    type: String,
    required: true
  },
  "firstName": {
    type: String,
    required: true
  },
  "lastName": {
    type: String,
    required: true
  },
  "email": {
    type: String,
    required: true
  },
  "phone_number": {
    type: Number,
    required: true
  },
  "dateCreated": {
    type: Date,
    required: true
  },
  "k9s": {
    type: Array,
    required: true
  }
})

const User = mongoose.model('User', userSchema);

app.route('/users/:id')
  .post((req, res) => {
    let postUser = new User({
      "username": req.query.username,
      "password": req.query.password,
      "firstName": req.query.firstName,
      "lastName": {
        type: String,
        required: true
      },
      "email": {
        type: String,
        required: true
      },
      "phone_number": {
        type: Number,
        required: true
      },
      "dateCreated": {
        type: Date,
        required: true
      },
      "k9s": {
        type: Array,
        required: true
      }
    })
    console.log(postUser)
    res.send()
  })



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})