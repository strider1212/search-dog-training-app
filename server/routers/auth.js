const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session');

const { User } = require('../mongoose/user');


router.use(session({secret: 'secrete cat'}));

router.use(passport.initialize());
router.use(passport.session());

passport.use('local', new LocalStrategy(function(username, password, done) {
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

router.post('/login', passport.authenticate('local', {successRedirect: '/profile', failureRedirect: '/signin'}))

router.get('/profile', (req, res) => {
  console.log('redirected!');
  res.send("Hey, hello from the server!");
})

router.get('/signin', (req, res) => {
  console.log('gotta sign in');
  res.end();
})

module.exports = router;