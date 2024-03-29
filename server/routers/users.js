const express = require('express')
const router = express.Router()

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

//authentication require package
const auth = require('./auth');
const requireSignin = auth.requireSignin;
const requireAuth = auth.requireAuth;
const tokenForUser = auth.tokenForUser;

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signIn', requireSignin, (req, res, next) => {
  res.json({
    token: tokenForUser(req.body)
  });
})

router.get('/', requireAuth, (req, res) => {
  getAll(User, res)
})

router.post('/', async (req, res) =>  {

  const usernameExists = User.findOne({username: req.body.username}).exec()
  
  usernameExists
  .then(async username => {
    if (username) {
      res.status(400).send('username already exists')
      return
    }

    try {
      const encyptedPassword = await bcrypt.hash(req.body.password, saltRounds);

      let postUser = new User({
        "username": req.body.username,
        "password": encyptedPassword,
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
    } catch {
      res.status(500).send()
    }
  })
})

router.get('/:id', requireAuth, (req, res) => {
  getById(User, req, res);
})

router.put('/:id', requireAuth, (req, res) => {
  putById(User, usersKeyMatch, usersKeyArray, req, res)
})

//the user and deleter should also recieve an email (later update)
router.delete('/:id', requireAuth, (req, res) => {
  deleteById(User, req, res);
})

router.get('/:id/k9s', requireAuth, (req, res) => {
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

router.post('/:id/k9s', requireAuth, (req, res) => {
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

router.delete('/:id/k9s/:k9', requireAuth, (req, res) => {
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