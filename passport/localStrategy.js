const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/models/User');
require('dotenv').config();

module.exports = () => {
  // Local Strategy
  passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
      },
      function (email, password, done) {
          // 이 부분에선 저장되어 있는 User를 비교하면 된다. 
          return User.findOne({email}, (err, user) => {
            if(err || !user) {
              done(err);
            };
            if (user) {
              // 비밀번호 확인
              bcrypt.compare(password, user.password, (err, result) => {
                //비밀번호 맞으면 로그인
                if (result){
                  return done(null, user, {message: 'Logged In Successfully'});
                }
                // 틀리면 에러
                return done(null, false, {message: "비밀번호가 일치하지 않습니다."});
              });
            }else{
              return done(null, false, {message: "없는 사용자 입니다."})
            };
          });
      }
  ));
}