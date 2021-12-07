const Post = require('../database/models/Post');

module.exports = async (req, res) => {
  const image = req.file
  try{
    await Post.create({
      ...req.body,
      image: `/uploads/${image.filename}`
    });
    res.redirect('/');
  } catch(err){
    res.status(400).redirect('/posts/new');
  }
}