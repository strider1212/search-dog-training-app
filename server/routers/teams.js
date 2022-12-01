const express = require('express');
const router = express.Router();

const { Team } = require('../mongoose/team');

const { teamsKeyArray } = require('../data/keyArray');
const { teamsKeyMatch } = require('../data/keyMatchArray');
const postNew = require('../methodFunctions/postNew');
const getById = require('../methodFunctions/getById');
const putById = require('../methodFunctions/putById');
const deleteById = require('../methodFunctions/deleteById');

const auth = require('./auth');
const requireAuth = auth.requireAuth;

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
  postNew(postTeam, res);
})

router.get('/:id', requireAuth, (req, res) => {
  getById(Team, req, res);
})

router.put('/:id', requireAuth, (req, res) => {
  putById(Team, teamsKeyMatch, teamsKeyArray, req, res);
})

router.delete('/:id', requireAuth, (req, res) => {
  deleteById(Team, req, res);
})

module.exports = router;