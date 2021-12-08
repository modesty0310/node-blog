const User = require('../database/models/User');

module.exports = (req, res) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    res.redirect('/');
  });
};