const { query } = require('express');
const express = require('express')
const router = express.Router()
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy

const { User } = require('../mongoose/user');

//utils & data
const arrayEquals = require('../utils/arrayEquals')
const { usersKeyArray } = require('../data/keyArray')
const { usersKeyMatch } = require('../data/keyMatchArray')
const getAll = require('../methodFunctions/getAll')
const postNew = require('../methodFunctions/postNew')
const getById = require('../methodFunctions/getById')
const putById = require('../methodFunctions/putById')
const deleteById = require('../methodFunctions/deleteById');
const hasher = require('../utils/hasher');
require('dotenv').config(); 

// router.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false ,
//   saveUninitialized: true ,
// }))

// router.use(passport.initialize()) 

// router.use(passport.session())    

// passport.use(new LocalStrategy (authUser))

router.get('/', (req, res) => {
  getAll(User, res)
})

router.post('/', async (req, res) =>  {
  //check all field on the front end
  let postUser = new User({
    "username": req.body.username,
    // "password": await hasher(req.query.password, 10),
    "password": req.body.password,
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "email": req.body.email,
    "phoneNumber": req.body.phoneNumber,
    "dateCreated": new Date(),
    //query must must be formatted like
    //&k9s[]=spike&k9s[]=lucey
    "k9s": req.query.k9s
  })
  postNew(postUser, res)
})

router.post('/signIn', async (req, res) => {
  console.log('req.body.username', req.body.username)
  console.log('req.body.password', req.body.password)

  res.send('testing')
})

router.get('/:id', (req, res) => {
  getById(User, req, res);
})

router.put('/:id', (req, res) => {
  putById(User, usersKeyMatch, usersKeyArray, req, res)
})

//make sure that this is accompanied by a warning message in the front end and only executable by the admin or user themself
//the user and deleter should also recieve an email
router.delete('/:id', (req, res) => {
  deleteById(User, req, res);
})

router.get('/:id/k9s', (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, user) =>{
    if (err) {
       console.error(err)
       res.status(404).end()
       return
    }
  
    if (user) {
       res.status(200).send(user.k9s)
       return
    }
  
    console.error('how did we get here?')
  })
}) 

router.post('/:id/k9s', (req, res) => {
  const id = req.params.id;
  const k9ToAdd = req.query.k9
  
  User.findByIdAndUpdate(id, {$push : {k9s: k9ToAdd}}, {new: true}, (err, user) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
    }

    const currentK9s = user.k9s;
    var unique = currentK9s.filter((v, i, a) => a.indexOf(v) === i);

    //checks to see if dog name has already been added by user
    if(!arrayEquals(currentK9s, unique)) {
      User.findByIdAndUpdate(id, {$pop : {k9s: 1}}, {new: true}, (err, user ) => {
        console.log('no new k9 added')
      })
      res.status(404).send('Cannot have more than one dog by the same name per user').end()
      return
    }

    if (user) {
      res.status(201).send(user)
      return
    }
  })
})

router.delete('/:id/k9s/:k9', (req, res) => {
  const id = req.params.id;
  const k9 = req.params.k9;

  User.findById(id, (err, user) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
    }

    const userk9s = user.k9s;
    let match;
    userk9s.map(dog => {
      if (dog === k9) {
        match = dog;
      }
    })

    User.findByIdAndUpdate(id, {$pull:{k9s: match}}, {new: true}, (err, data) => {
      if (err) {
        console.error(err)
        res.status(404).end()
        return;
      }

      if (data) {
        res.status(201).send(`Successfully deleted ${k9} from user account.`).end()
        return
      }
    })
  })
  
  
})

module.exports = router;