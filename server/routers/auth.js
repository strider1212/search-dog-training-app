const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config({path: '/Users/joshuacushing/code/Parsity/final-project/search-dog-app/server/.env'});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false ,
  saveUninitialized: true ,
}))
// This is the basic express session({..}) initialization.
app.use(passport.initialize()) 
// init passport on every route call.
app.use(passport.session())    
// allow passport to use "express-session".