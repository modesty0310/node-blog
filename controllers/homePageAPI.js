const Post = require('../database/models/Post');
const Category = require('../database/models/Category');

module.exports = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({_id: -1}).populate('userId');
    const categories = await Category.find();
    res.render('index', {
      posts,
      categories
    });
  } catch (err) {
    res.status(400).json({message:err});
  };
  
}