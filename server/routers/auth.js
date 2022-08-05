const express = require('express')
const router = express.Router()
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config({path: '/Users/joshuacushing/code/Parsity/final-project/search-dog-app/server/.env'});

router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false ,
  saveUninitialized: true ,
}))

router.use(passport.initialize()) 
router.use(passport.session())    
passport.use(new LocalStrategy (authUser))
