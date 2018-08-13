const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});


userSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function (candidatePassword, password) {
  return bcrypt.compareSync(candidatePassword, password);
};

const user = mongoose.model('User', userSchema);

module.exports = user;
