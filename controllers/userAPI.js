const User = require('../database/models/User');

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
    res.redirect('/');
  };
}