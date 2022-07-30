const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  "team_name": String,
  "created_by": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  "date_created": Date,
  "members": [mongoose.Types.ObjectId],
  "admin_members": [mongoose.Types.ObjectId]
})

const Log = mongoose.model('Log', logSchema);

module.exports = {logSchema, Log}