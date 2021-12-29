const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '이름을 작성해 주세요.'],
  },
  email: {
    type: String,
    required: [true, 'email을 작성해 주세요.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, '비밀번호를 작성해 주세요.'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

// arrow function 을 쓰면 this를 못씀
UserSchema.pre('save', function (next) {
  user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema)