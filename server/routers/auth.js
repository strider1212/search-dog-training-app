const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const router = express.Router();

router.get('/login', function(req, res, next) {
  console.log('connected')
  res.end()
});

router.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/~' + req.user.username);
  });

module.exports = router;