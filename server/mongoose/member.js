const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  "member": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }, 
  "time": {
    type: Date,
    required: true,
  },
  "blind": {
    type: Boolean,
    required: true,
  },
  "k9": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  "distractions": {
    type: [String],
    required: true,
  },
  "notes": {
    type: String,
    required: true,
  }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = {memberSchema, Member}