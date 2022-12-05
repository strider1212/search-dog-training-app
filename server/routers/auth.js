const express = require('express')
const router = express.Router()

require('dotenv').config('.env');

//Mongoose imports
const { User } = require('../mongoose/user');

//authentication imports
const passport = require('passport')
const jwt = require("jwt-simple");
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


//app-level middleware
router.use(passport.initialize());

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {

    //replace with a User.findOne (review docs)
    const foundUser = await User.findOne({username: username}, (error, user) => {
      if (error) return false;

      if (!user) return false;

      return true;
    }).clone()

    const returnedUser = await User.findOne({username: username}, (error, user) => {
      if (error) return false;

      if (!user) return false;

      return username;
    }).clone()

    if (!foundUser) {
     return done(null, false)
    }

    
    if(await bcrypt.compare(password, returnedUser.password)) {
      return done(null, username)
    } else {
      return done(null, false)
    }
    // if(returnedUser.password != password) return done(null, false)
  })
);
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.AUTH_SECRETE_KEY,
    };

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, function (payload, done) {  
    return done(null, { username: payload.username });
  })
);


//this is to be exported to axiox.post('/singIn')
const tokenForUser = function (user) {
  return jwt.encode(
    {
      username: user.username,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    process.env.AUTH_SECRETE_KEY
  );
};

const requireSignin = passport.authenticate("login", { session: false });

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports.requireSignin = requireSignin;
module.exports.requireAuth = requireAuth;
module.exports.tokenForUser = tokenForUser;

/*
  AUTHENTICATION METHOD CHECKLIST
    serverside
      requireAuth to router
    clientside
      add header to axios.post
      add alert to .catch
      test authorized
      test unauthorized

  CLIENT PACKAGE
  axios.post('route', {headers: {Authorization: localStorage.getItem('token')}})
  INSIDE OF CATCH STATEMENTs
  if(error.response.data === "Unauthorized") {
    alert('Must sign in to perform this action. Your session may have timed out. Please, sign back in and try again.')
  }

*/