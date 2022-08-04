const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const cookieSession = require('cookie-session');

const { User } = require('../mongoose/user');

router.use(passport.initialize());


router.use(
  cookieSession({
    name: "session",
    keys: ["helloworld"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

router.use('local', new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, (err, user) => {
    if (err) return done(err);

    if (!user) return done(null, false);

    if (user.password != password) return done(null, false);

    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    return done(null, user);
  });
});

router.post('/login', passport.authenticate('local', (req, res) => {
  console.log('Boom!');
  res.end();
}))

module.exports = router;