const Post = require('../database/models/Post');

exports.searchPost = async (req, res, next) => {
  const query = req.query.search;
  if(!query) {
    return res.redirect('/');
  };
  try {
    const posts = await Post.find({$text:{$search: query}}).sort({_id: -1});
    if(posts.length){
      res.render('index', {
        posts
      });
    };
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
}