const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new LocalStrategy((username, password, done) => {
    
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