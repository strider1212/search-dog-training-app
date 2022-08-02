const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');


const router = express.Router();

router.get('/login', function(req, res, next) {
  console.log('connected')
  res.end()
});

module.exports = router;