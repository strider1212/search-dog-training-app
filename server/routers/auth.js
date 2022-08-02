const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../mongoose/user');


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false);

      if (user.password != password) return done(null, false);

      return done(null, user);
    })
  })
);

router.get('/login', function(req, res, next) {
  console.log('connected')
  res.end()
});

router.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;