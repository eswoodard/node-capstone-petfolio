const localStrategy = require('passport-local').Strategy;

const User = require('./models/user');

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new localStrategy(((username, password, done) => {
    console.log(password);
    User.findOne({
      username,
    }, (err, doc) => {
      if (err) {
        done(err);
      } else if (doc) {
        const valid = doc.comparePassword(password, doc.password);
        console.log(valid);
        if (valid) {
          // do not add password hash to session
          done(null, {
            username: doc.username,
            id: doc._id,
          });
        } else {
          done(null, false);
        }
      } else {
        done(null, false);
      }
    });
  })));
};
