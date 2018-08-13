
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRouter = require('./routers/authRouter');
const petsRouter = require('./routers/petsRouter');

require('./passport')(passport);

mongoose.Promise = global.Promise;

const {
  PORT, DATABASE_URL,
} = require('./config');


const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(morgan('common'));
app.use('/', authRouter);
app.use('/', petsRouter);

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
