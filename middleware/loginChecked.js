const User = require('../database/models/User');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

exports.isAdmin = async (req, res, next) => {
  console.log(req.param.id);
  const id = req.user._id;
  const user = await User.findById({_id});
  if(user.isAdmin) return next();
  
  res.redirect('/');
}