const User = require('../database/models/User');
const bcrypt = require('bcrypt');

module.exports = class UserAPI {

  static createUser (req, res) {
    res.render('register');
  };

  static storeUser (req, res) {
    User.create(req.body, (err, user) => {
      if (err) {
        return res.redirect('/users/register');
      }
      res.redirect('/');
    });
  };

  static loginPage (req, res) {
    res.render('login');
  };

  static login (req, res) {
    const {email, password} = req.body;
    // 사용자 찾기
    User.findOne({email}, (err, user) => {
      if (user) {
        // 비밀번호 확인
        bcrypt.compare(password, user.password, (err, result) => {
          //비밀번호 맞으면 로그인
          if (result) return res.redirect('/');
          // 틀리면 에러
          return res.json({message: "비밀번호가 일치하지 않습니다."});
        });
      }else{
        return res.json({message: "없는 사용자 입니다.."})
      }
    });
  };

}