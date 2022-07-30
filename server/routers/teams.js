const express = require('express');
const router = express.Router();

const { Team } = require('../mongoose/team');

module.exports = router;

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