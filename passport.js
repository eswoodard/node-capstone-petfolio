const localStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const { JWT_SECRET } = require('./config');
const User = require('./models/user');


module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new localStrategy((username, password, done) => {
    // console.log(password);
    User.findOne({
      username,
    }, (err, user) => {
      console.log(err, user);
      if (err) {
        return done(err);
      } if (user) {
        const valid = user.comparePassword(password, user.password);
        console.log(valid, user);
        if (valid) {
          return done(null, {
            username: user.username,
            id: user._id,
          });
        }
        return done(null, false);
      }
      return done(null, false);
    });
  }));
  // console.log(JWT_SECRET);
  passport.use(new JwtStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['HS256'],
    },
    (payload, done) => {
      // console.log('Payload', payload);
      User.findOne({ _id: payload.user.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, {
            username: user.username,
            id: user._id,
          });
        }
        return done(null, false);
      });
    },
  ));
};
