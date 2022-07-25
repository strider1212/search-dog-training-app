const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json())

app.route('/logs')
  .get((req, res) => {
    res.send('test')
  })

app.route('/logs/:id')
  .get((req, res) => {
    const id = req.params.id;
    res.send(id)
  })

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})