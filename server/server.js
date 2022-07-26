const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { User } = require('./mongoose/user')

mongoose.connect('mongodb+srv://strider1212:KtZxygIgOzheV762@cluster0.tgm5d.mongodb.net/search-dog-test');

const PORT = 3000;

app.use(express.json())

app.route('/users/:id')
  .post(async (req, res) =>  {
    let postUser = new User({
      "username": req.query.username,
      "password": req.query.password,
      "firstName": req.query.firstName,
      "lastName": req.query.lastName,
      "email": req.query.email,
      "phoneNumber": req.query.phoneNumber,
      "dateCreated": new Date(),
      //query must must be formatted like
      //&k9s[]=spike&k9s[]=lucey
      "k9s": req.query.k9s
    })
    await postUser.save()
    res.sendStatus(201);
  })



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})