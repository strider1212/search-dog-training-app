const express = require('express')
const router = express.Router()
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config({path: '/Users/joshuacushing/code/Parsity/final-project/search-dog-app/server/.env'});

const { User } = require('../mongoose/user');

//TESTING ONLY
printData = (req, res, next) => {
  console.log("\n==============================")
  console.log(`------------>  ${count++}`)

  console.log(`req.body.username -------> ${req.body.username}`) 
  console.log(`req.body.password -------> ${req.body.password}`)

  console.log(`\n req.session.passport -------> `)
  console.log(req.session.passport)

  console.log(`\n req.user -------> `) 
  console.log(req.user) 

  console.log("\n Session and Cookie")
  console.log(`req.session.id -------> ${req.session.id}`) 
  console.log(`req.session.cookie -------> `) 
  console.log(req.session.cookie) 

  console.log("===========================================\n")

  next()
}

router.use(printData)
//TESTING ONLY

router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false ,
  saveUninitialized: true ,
}))

router.use(passport.initialize()) 
router.use(passport.session())    

authUser = async (user, password, done) => {
  User.findOne({username: user}, (err, user) => {
    if(err) return done(err);
 
    if(!user) return done(null, false);

    if(user.password != password) return done(null, false);

    return done(null, user)
  })
}

passport.use(new LocalStrategy (authUser))

passport.serializeUser( (userObj, done) => {
  done(null, userObj)
})

passport.deserializeUser((userObj, done) => {
  done (null, userObj )
})

router.post ("/login", passport.authenticate('local', {
  successRedirect: "/home",
  failureRedirect: "/login",
}))

router.delete("/logout", (req,res) => {
  req.logOut()
  res.redirect("/login")
  console.log(`-------> User Logged out`)
})