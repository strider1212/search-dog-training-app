require('dotenv').config();
const express = require('express')
const router = express.Router()
const session = require('express-session');
const passport = require("passport");
const bodyParser = require("body-parser");
const { User } = require('../mongoose/user');


const LocalStrategy = require("passport-local").Strategy;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
router.use(passport.initialize())

passport.use('local', new LocalStrategy((username, password, done) => {
  
}))

router.get('/login', (req, res) => {
  res.send(req.body)
})

router.post('/login', 
passport.authenticate('local', {
  successRedirect: '/auth/',
  failureRedirect: '/auth/login',
  session: false
}),
(req, res) => {
  res.send(req.body)
}
)

router.get('/', (req, res) => {
  res.send(req.body)
})


module.exports = router;