
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
// const router = require('./router');

const jsonParser = bodyParser.json();

require('./passport')(passport);

mongoose.Promise = global.Promise;

const {
  PORT, DATABASE_URL, JWT_EXPIRY, JWT_SECRET,
} = require('./config');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('common'));
app.use('/user', User);


const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

console.log(JWT_SECRET);
const createAuthToken = user => jwt.sign({ user }, JWT_SECRET, {
  subject: user.username,
  expiresIn: JWT_EXPIRY,
  algorithm: 'HS256',
});

app.post('/auth/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = createAuthToken(req.user);
  const profile = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    token,
  };
  res.json({ profile });
});

app.get('/protected', jwtAuth, (req, res) => {
  console.log(req);
  res.json(req.user);
});

app.post('/auth/signup', (req, res) => {
  console.log(req.body);
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

// app.post('/refresh', jwtAuth, (req, res) => {
//   const token = jwt.sign(req.user, 'your_jwt_secret');
//   res.json({ token });
// });

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, (err) => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', (err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  }));
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
