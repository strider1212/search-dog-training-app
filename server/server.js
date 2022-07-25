const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json())

app.route('/logs')
  .get((req, res) => {
    res.send('test')
  })

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})