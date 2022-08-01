const express = require('express');
const router = express.Router();

const { Team } = require('../mongoose/team');

const teamsKeyArray = require('../data/keyArray')
const keyChecker = require('../utils/keyChecker')
const postNew = require('../methodFunctions/postNew')
const getById = require('../methodFunctions/getById')
const putById = require('../methodFunctions/putById');
const deleteById = require('../methodFunctions/deleteById');

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
  postNew(postTeam, Team, req, res);
})

router.get('/:id', (req, res) => {
  getById(Team, 'teams', req, res);
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const key = req.query.key;
  const value = req.query.value;

  if (key === 'members' || key === 'admin_members') {
    res.status(404).send('Cannot update this category in this way. Can only add or delete.')
    return
  }
  
  if (!keyChecker(key, teamsKeyArray.teamsKeyArray)) {
    console.error("Key must match userSchema.")
    res.status(404).end()
    return
  }

  putById(id, key, value, Team, 'teams', req, res);
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  deleteById(id, Team, 'teams', req, res);
})

module.exports = router;