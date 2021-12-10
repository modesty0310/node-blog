module.exports = (req, res, next) => {
  if (!req.body.username || !req.body.title || !req.body.subtitle){
    return res.redirect('/posts/create');
  }
  next();
};

