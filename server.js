const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');


mongoose.connect('mongodb://localhost:27017/petfolio', (err) => {
  if (err) {
    console.log('unable to connect to mongoDb', err);
  } else {
    console.log('connected to mongoDb');
  }
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/auth/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.create({
    email, password,
  }).then(user => res.json(user));
});

app.listen(process.env.PORT || 8080);
