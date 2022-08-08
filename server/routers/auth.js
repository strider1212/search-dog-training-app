const express = require('express')
const router = express.Router()
const session = require('express-session');
require('dotenv').config();

router.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

router.get('/login', (req, res) => {
  console.log('testing GET /login')
  res.send('test GET /login')
})

module.exports = router;