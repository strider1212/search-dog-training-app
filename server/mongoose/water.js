const mongoose = require('mongoose');

const waterSchema = new mongoose.Schema({})

const Water = mongoose.model('Water', waterSchema);

module.exports = {waterSchema, Water}