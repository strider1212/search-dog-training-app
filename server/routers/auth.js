const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { User } = require('../mongoose/user');
const postNew = require('../methodFunctions/postNew');
const initializePassport = require('../utils/passportConfig');
const flash = require('express-flash');
require('dotenv').config({path: '../.env'})

initializePassport(passport, username => {
  User.findOne({username: username}, (err, user) => {
    if (user.username === username) {
      return username;
    } else {
      return false;
    }
  })
});

router.use(express.urlencoded({extended: false}));
router.use(flash());
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
router.use(passport.session())

router.get('/', (req, res) => {
  console.log('test get');
  res.send('got auth page')
})

router.get('/login', (req, res) => {
  console.log('You are at the login page')
  res.send('You are at the login page')
})

router.post('/login', passport.authenticate('local', {
  successMessage: 'login successful',
  failureMessage: 'login failed',
  failureFlash: true
}))


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