module.exports = (req, res, next) => {
  if (!req.body.username || !req.body.title || !req.body.subtitle){
    console.log("store");
    return res.redirect('/posts/create');
  }
  next();
};

