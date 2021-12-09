const User = require('../database/models/User');

module.exports = class UserAPI {

  static createUser (req, res) {
    res.render('register');
  };

  static storeUser (req, res) {
    console.log(req.body);
    User.create(req.body, (err, user) => {
      res.redirect('/');
    });
  };
}