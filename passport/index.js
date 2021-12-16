const passport = require('passport');
const local = require('./localStrategy');
const jwt = require('./jwtStrategy');
const User = require('../database/models/User');

module.exports = () => {
  // strategy 에서 넘어온 user정보를 받음 필요한 부분만 session에 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // 로그인 되어 있는동안 모든 행동에 실행.
  passport.deserializeUser((id, done) => {
    console.log(id);
    User.findById({_id: id})
      .then(user => {
        console.log(user);
        done(null, user)
      })
      .catch(err => done(err));
  });

  local();
  jwt();
};