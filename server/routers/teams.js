const express = require('express');
const router = express.Router();

const { Team } = require('../mongoose/team');

module.exports = router;

router.post('/', (req, res) => {
  console.log('connected')
  res.end()
})