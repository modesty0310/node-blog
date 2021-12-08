const User = require('../database/models/User');

module.exports = async (req, res) => {
  await User.create(req.body, (err, user) => {
    res.redirect('/');
  });
};