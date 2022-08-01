const mongoose = require('mongoose');

const individual_runsSchema = new mongoose.Schema({
  "member": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }, 
  "time": {
    type: Date,
    required: true
  },
  "blind": {
    type: Boolean,
    required: true
  },
  "k9": {
    type: String,
    required: true
  },
  "distractions": {
    type: [String],
    required: true
  },
  "notes": {
    type: String,
    required: true
  }
});

const Individual_Runs = mongoose.model('Member', individual_runsSchema);

module.exports = {memberSchindividual_runsSchemaema, Individual_Runs}