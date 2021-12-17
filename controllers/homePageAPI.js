const Post = require('../database/models/Post');

module.exports = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({_id: -1})
    res.render('index', {
      posts
    });
  } catch (err) {
    res.status(400).json({message:err});
  };
  
}