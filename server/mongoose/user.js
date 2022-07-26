const mongoose = require('mongoose');

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
  "phoneNumber": {
    type: Number,
    required: true
  },
  "dateCreated": {
    type: Date,
    required: true
  },
  "k9s": {
    type: [String],
    required: true
  }
})

const User = mongoose.model('User', userSchema);

module.exports = {userSchema, User}