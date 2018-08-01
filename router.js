// const express = require('express');
// const passport = require('passport');
// const bodyParser = require('body-parser');
// const User = require('./models/user');

// const router = express.Router();
// const jsonParser = bodyParser.json();

// router.post('/auth/signup', jsonParser, (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const username = req.body.username;
//   const password = req.body.password;

//   return User.findOne({ username })
//     .count()
//     .then((count) => {
//       if (count > 0) {
//         return Promise.reject({
//           code: 422,
//           reason: 'ValidationError',
//           message: 'Username already taken',
//           location: 'username,',
//         });
//       }
//     })
//     .then(hash => user.create({
//       firstName,
//       lastName,
//       username,
//       password,
//     }))
//     .then(user => res.status(201).json(user))
//     .catch((err) => {
//       if (err.reason === 'ValidationError') {
//         return res.status(err.code).json(err);
//       }
//       res.status(500).json({ code: 500, message: 'Internal server error' });
//     });
// });

// User.findOne({ username }, (err, doc) => {
//   if (err) { res.status(500).send('error occured'); } else if (doc) {
//     res.status(500).send('Username already exists');
//   } else {
//     User.create({
//       firstName,
//       lastName,
//       username,
//       password,
//     }).then((user) => {
//       res.status(201).json(user);
//     }).catch((err) => {
//       res.status(500).json(err);
//     });
//   }
// });


// module.exports = { router };
