const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session');
const bcrypt = require('bcrypt');
const postNew = require('../methodFunctions/postNew');

const { User } = require('../mongoose/user');

router.use(express.urlencoded({extended: false}))

router.get('/', (req, res) => {
  console.log('test get');
  res.send('got auth page')
})

router.get('/login', (req, res) => {
  res.render('login.ejs', {name: 'Josh'})
})

router.post('/login', (req, res) => {
  
})


router.get('/register', (req, res) => {
  res.render('register.ejs', {name: 'Josh'})
})

router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  const postUser = new User({
    "username": req.query.username,
    "password": hashedPassword,
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "phoneNumber": req.query.phoneNumber,
    "dateCreated": new Date(),
    //query must must be formatted like
    //&k9s[]=spike&k9s[]=lucey
    "k9s": req.query.k9s
  })
    
  try {
    await postNew(postUser, res)
    res.redirect('/login');
  } catch {
    res.redirect('/register')
  }
  console.log(postUser)
})


module.exports = router;