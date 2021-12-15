const User = require('../database/models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

module.exports = class UserAPI {

  static createUser (req, res) {
    if(req.method == "GET"){
      res.render('register', {
        errors: req.flash('registrationErrors'),
        data: req.flash('data')[0],
      });
    }else{
      User.create(req.body, (err, user) => {
        if (err) {
          const registrationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
          
          req.flash('registrationErrors',registrationErrors);
          req.flash('data', req.body);
          return res.redirect('/users/register');
        }
        res.redirect('/');
      });
    };
  };

  static login (req, res, next) {    
    if(req.method == "GET"){
      res.render('login');
    }else{
      passport.authenticate('local', (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: err,
                user   : user
            });
        }
        return req.login(user, (err) => {
            if (err) {
                return res.send(err);
            }
            // jwt.sign('token내용', 'JWT secretkey')
            // const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
            return res.redirect('/');
        });
    })(req, res, next);
    };
  };
    

}