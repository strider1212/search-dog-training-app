const express = require('express');
const app = express();

const PORT = 3000;

//use app.route() to chaine routes. See https://expressjs.com/en/guide/routing.html
//make modular with express.Router(). ibid.

app.get('/', (req, res) => {
  res.send('Hello World! Testing 1, 2, 2...')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})