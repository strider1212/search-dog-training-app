const { query } = require('express');
const express = require('express')
const router = express.Router()

const { User } = require('../mongoose/user');

const arrayEquals = require('../utils/arrayEquals')


router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
    }

   if (users) {
    res.status(200).send(users)
    return
   }

   console.error('how did we get here?')

  })
})

router.post('/', (req, res) =>  {
  //check all field on the front end
  let postUser = new User({
    "username": req.query.username,
    "password": req.query.password,
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "phoneNumber": req.query.phoneNumber,
    "dateCreated": new Date(),
    //query must must be formatted like
    //&k9s[]=spike&k9s[]=lucey
    "k9s": req.query.k9s
  })
  postUser.save()
  res.status(201).send(postUser);
})

router.get('/:id', (req, res) => {
  //require id be 24 characters on the front end
  const id = req.params.id;
  User.findById(id, (err, user) =>{
    if (err) {
       console.error(err)
       res.status(404).end()
       return
    }
  
    if (user) {
       res.status(200).send(user)
       return
    }
  
    console.error('how did we get here?')
  })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const key = req.query.key;
  const value = req.query.value;

  if (key !== 'username' && key !== 'password' && key !== 'firstName' && key !== 'lastName' && key !== 'email' && key !== 'phoneNumber' && key !== 'k9s') {
    console.error("Key must match userSchema.")
    res.status(404).end()
    return
  }

  User.findByIdAndUpdate(id, {[key]: value}, {new: true, lean: true}, (err, updatedUser) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
   }

    if (key === 'k9s') {
      res.status(404).send('Cannot update this category in this way. Can only add or delete from k9s.')
      return
    }

    if (updatedUser) {
      res.status(200).send(updatedUser)
      return
    }
    
   console.error('how did we get here?')
  })
})

//make sure that this is accompanied by a warning message in the front end and only executable by the admin or user themself
//the user and deleter should also recieve an email
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id, (err, user) => {
    if (err) {
      console.error(err)
      res.status(400).end()
      return
    }

    if (user) {
      res.status(200).send(`${user.username}'s account was deleted.`)
      return
    }
  })
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
  //will delete two of the same, though they shouldn't be there
  console.log('connected')
  res.end()
})

module.exports = router;