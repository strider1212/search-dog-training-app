const express = require('express');
const router = express.Router();

const { Team } = require('../mongoose/team');

const teamsKeyArray = require('../data/keyArray')
const keyChecker = require('../utils/keyChecker')

router.post('/', (req, res) => {
  let postTeam = new Team({
    "team_name": req.query.team_name,
    //memberID
    "created_by": req.query.created_by,
    "date_created": new Date(),
    //?members[]=memberID
    "members": req.query.members,
    //?admin_members[]=memberID
    "admin_members": req.query.admin_members
  })
  postTeam.save();
  res.status(201).send(postTeam);
})

router.get('/:id', (req, res) => {
   const id = req.params.id;
    Team.findById(id, (err, team) =>{
      if (err) {
        console.error(err)
        res.status(404).end()
        return
      }
    
      if (team) {
        res.status(200).send(team)
        return
      }
    
      console.error('how did we get here?')
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const key = req.query.key;
  const value = req.query.value;

  if (!keyChecker(key, teamsKeyArray.teamsKeyArray)) {
    console.error("Key must match userSchema.")
    res.status(404).end()
    return
  }

  Team.findByIdAndUpdate(id, {[key]: value}, {new: true, lean: true}, (err, updatedTeam) => {
    if (err) {
      console.error(err)
      res.status(404).end()
      return
   }

    if (key === 'members' || key === 'admin_members') {
      res.status(404).send('Cannot update this category in this way. Can only add or delete.')
      return
    }

    if (updatedTeam) {
      res.status(200).send(updatedTeam)
      return
    }
    
   console.error('how did we get here?')
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Team.findByIdAndDelete(id, (err, team) => {
    if (err) {
      console.error(err)
      res.status(400).end()
      return
    }

    if (team) {
      res.status(200).send(`${team.team_name}'s account was deleted.`)
      return
    }
  })
})

module.exports = router;