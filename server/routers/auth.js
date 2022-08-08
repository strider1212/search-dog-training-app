const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  console.log('testing GET /login')
  res.send('test GET /login')
})

module.exports = router;