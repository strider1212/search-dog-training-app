const express = require('express');
const router = express.Router();

const { Team } = require('../mongoose/team');

const { teamsKeyArray } = require('../data/keyArray');
const { teamsKeyMatch } = require('../data/keyMatchArray');
const postNew = require('../methodFunctions/postNew');
const getById = require('../methodFunctions/getById');
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
  putById(Team, 'teams', teamsKeyMatch, teamsKeyArray, req, res);
})

router.delete('/:id', (req, res) => {
  deleteById(Team, req, res);
})

module.exports = router;