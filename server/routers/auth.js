const express = require('express');


const router = express.Router();

router.get('/login', function(req, res, next) {
  console.log('connected')
  res.end()
});

module.exports = router;