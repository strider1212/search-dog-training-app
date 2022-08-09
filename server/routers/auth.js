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
router.use(passport.session());

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use('local', new LocalStrategy((username, password, done) => {
  User.findOne({username: username}, (err, user) => {
    if(err) return done(err)

    if(!user) return done(null, false)

    if(user.password != password) return done(null, false)

    return done(null, user)
  })
}))

router.get('/login', (req, res) => {
  res.send(req.body)
})

router.post('/login', 
passport.authenticate('local', { failureRedirect: '/auth/login'}),
(req, res) => {
  res.redirect('/auth/')
})

router.get('/', (req, res) => {
  res.send(req.body)
})


module.exports = router;