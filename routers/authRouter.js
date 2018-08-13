const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const User = require('../models/user');


const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });


const createAuthToken = user => jwt.sign({ user }, JWT_SECRET, {
  subject: user.username,
  expiresIn: JWT_EXPIRY,
  algorithm: 'HS256',
});

router.post('/auth/login', passport.authenticate('local', { session: false }), (req, res) => {
  // console.log(req);
  User.findById(req.user.id).then((userData) => {
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const username = userData.username;
    const token = createAuthToken(req.user);
    const profile = {
      firstName,
      lastName,
      username,
      token,
    };
    // console.log(profile);
    res.json({ profile });
  });
});

router.post('/auth/signup', (req, res) => {
  // console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  // console.log(password);
  User.findOne({ username }, (err, user) => {
    if (err) { res.status(500).send('error occured'); } else if (user) {
      res.status(500).send('Username already exists');
    } else {
      User.create({
        firstName,
        lastName,
        username,
        password,
      }).then((user) => {
        const token = createAuthToken(user);
        res.status(201).json({ token, user });
      }).catch((err) => {
        res.status(500).json(err);
      });
    }
  });
});

router.get('/protected', jwtAuth, (req, res) => {
  // console.log(req);
  res.json(req.user);
});

module.exports = router;
