const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 3000;

app.use(express.json())


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})