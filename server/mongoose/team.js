const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  "team_name": {
    type: String,
    required: true
  },
  "created_by": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  "date_created": {
    type: Date,
    required: true
  },
  "members": {
    type: [mongoose.Types.ObjectId],
    required: false
  },
  "admin_members": {
    type: [mongoose.Types.ObjectId],
    required: false
  }
})

const Team = mongoose.model('Team', teamSchema);

module.exports = {teamSchema, Team}