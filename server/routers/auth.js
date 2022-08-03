const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../mongoose/user');


router.use(passport.initialize());
router.use(passport.session());

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

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);

    done(null, user);
  })
})

router.get('/login', function(req, res, next) {
  console.log('connected')
  res.end()
});

router.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });

//create a logout using req.logout (https://www.codecademy.com/courses/user-authentication-authorization-express/lessons/passport-js-local-authentication/exercises/logging-out)

//bcrypt (https://www.codecademy.com/courses/user-authentication-authorization-express/lessons/bcrypt/exercises/using-bcrypt-to-hash-passwords)

module.exports = router;