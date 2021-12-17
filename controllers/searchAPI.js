const Post = require('../database/models/Post');

exports.searchPost = async (req, res, next) => {
  const query = req.query.search;
  console.log(query);
  if(!query) {
    return res.redirect('/');
  };
  try {
    const posts = await Post.find({'title':{$search: query}}).sort({_id: -1})
    res.render('index', {
      posts
  });
  } catch (err) {
    console.log(err);
  }
}