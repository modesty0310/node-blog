const Post = require('../database/models/Post');

module.exports = async (req, res) => {
  try {
    const posts = await Post.find({})
  res.render('index', {
    posts
  });
  } catch (err) {
    res.status(400).json({message:err});
  }
  
}