const { query } = require('express');
const express = require('express')
const router = express.Router()

const { User } = require('../mongoose/user');


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

module.exports = router;