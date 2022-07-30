const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  "team_name": String,
  "created_by": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  "date_created": Date,
  "members": [mongoose.Types.ObjectId],
  "admin_members": [mongoose.Types.ObjectId]
})

const Team = mongoose.model('Team', teamSchema);

module.exports = {teamSchema, Team}