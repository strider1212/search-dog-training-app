const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://strider1212:KtZxygIgOzheV762@cluster0.tgm5d.mongodb.net/search-dog-test');
  catch(error => handleError(error));

const PORT = 3000;

app.use(express.json())


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})