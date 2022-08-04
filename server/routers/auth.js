const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session');
const bcrypt = require('bcrypt');
const postNew = require('../methodFunctions/postNew');
const { initializePassport } = require('../utils/passportConfig');
initializePassport(passport);

const { User } = require('../mongoose/user');

router.use(express.urlencoded({extended: false}))

router.get('/', (req, res) => {
  console.log('test get');
  res.send('got auth page')
})

router.get('/login', (req, res) => {
  console.log('You are at the login page')
  res.send('You are at the login page')
})

router.post('/login', (req, res) => {
  
})


router.get('/register', (req, res) => {
  console.log('You are at the register page')
  res.send('You are at the register page')
})

router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.query.password, 10)
  const postUser = new User({
    "username": req.query.username,
    "password": hashedPassword,
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "phoneNumber": req.query.phoneNumber,
    "dateCreated": new Date(),
    //query must must be formatted like
    //&k9s[]=spike&k9s[]=lucey
    "k9s": req.query.k9s
  })
    
  postNew(postUser, res);
})


module.exports = router;