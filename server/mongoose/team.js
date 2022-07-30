const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  "team_name": String,
  //memberID
  "created_by": req.query.created_by,
  "date_created": req.query.date_created,
  "members": req.query.members,
  "admin_members": req.query.admin_members
})

const Team = mongoose.model('Team', teamSchema);

module.exports = {teamSchema, Team}