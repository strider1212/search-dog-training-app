const express = require('express');
const router = express.Router();

const { Log } = require('../mongoose/log')

router.post('/', (req, res) => {
  console.log('connected')
  res.end()
})

module.exports = router;