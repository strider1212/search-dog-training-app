const express = require('express');
const router = express.Router();

const { Team } = require('../mongoose/team');

module.exports = router;

router.post('/', (req, res) => {
  let postTeam = new Team({
    "team_name": req.query.team_name,
    "created_by": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    "date_created": Date,
    "members": Array,
    "admin_members": Array
  })
  res.status(201).send(postTeam)
})