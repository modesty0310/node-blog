const User = require('../database/models/User');
const bcrypt = require('bcrypt');

module.exports = class UserAPI {

  static createUser (req, res) {
    if(req.method == "GET"){
      console.log(req.session.registrationErrors);
      res.render('register');
    }else{
      User.create(req.body, (err, user) => {
        if (err) {
          const registrationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
          
          req.session.registrationErrors = registrationErrors;
          return res.redirect('/users/register');
        }
        res.redirect('/');
      });
    };
  };

  static login (req, res) {
    const {email, password} = req.body;
    
    if(req.method == "GET"){
      res.render('login');
    }else{
        // 사용자 찾기
      User.findOne({email}, (err, user) => {
        if (user) {
          // 비밀번호 확인
          bcrypt.compare(password, user.password, (err, result) => {
            //비밀번호 맞으면 로그인
            if (result){
              req.session.userId = user._id;
              return res.redirect('/');
            }
            // 틀리면 에러
            return res.json({message: "비밀번호가 일치하지 않습니다."});
          });
        }else{
          return res.json({message: "없는 사용자 입니다.."})
        };
      });
    };
  };
    

}