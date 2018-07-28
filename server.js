const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

require('./passport')(passport);


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
app.use(session({
  secret: 'thesecret',
  saveUninitialized: false,
  resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', User);

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};


app.post('/auth/signup', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  console.log(password);
  User.findOne({ username }, (err, doc) => {
    if (err) { res.status(500).send('error occured'); } else if (doc) {
      res.status(500).send('Username already exists');
    } else {
      User.create({
        firstName,
        lastName,
        username,
        password,
      }).then((user) => {
        res.status(201).json(user);
      }).catch((err) => {
        res.status(500).json(err);
      });
    }
  });
});

app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  // User.findOne({
  //   username,
  // }).then((user) => {
  //   console.log(user);
  //   user.comparePassword(password, (err, isMatch) => {
  //     if (err) throw err;
  //     console.log(password, isMatch); // -> Password123: true
  //   });
  // });
  const token = jwt.sign(req.user, 'your_jwt_secret');
  res.json({ token });
});

app.listen(process.env.PORT || 8080);
