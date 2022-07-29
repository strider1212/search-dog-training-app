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


  User.findByIdAndUpdate(id, {firstName: value}, {new: true, lean: true}, (err, updatedUser) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
   }

   console.log(Object.keys(updatedUser))

   if (updatedUser) {
    res.status(200).send(updatedUser)
    return
   }
    
   console.error('how did we get here?')
  })
})

module.exports = router;