const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const JWT_SECRET = require('./config');
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

  passport.use(new JwtStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      algorithms: ['HS256'],
    },
    (payload, done) => {
      User.findOne({ id: jwt_payload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    },
  ));
};
