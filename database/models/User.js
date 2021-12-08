const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// arrow function 을 쓰면 this를 못씀
UserSchema.pre('save', function (next) {
  user = this;
  console.log(this);
  bcrypt.hash(user.password, 10, (err, encrypted) => {
    user.password = encrypted;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema)