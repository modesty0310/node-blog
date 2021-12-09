const Post = require('../database/models/Post');

module.exports = class PostAPI {

  static async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      res.render('post', {
        post
      });
    } catch (err) {
      res.status(400).json({message:err})
    }
    
  };

  static createPost(req, res) {
    res.render('create');
  };

  static async storePost(req, res) {
    const image = req.file;
    try{
      await Post.create({
        ...req.body,
        image: `/uploads/${image.filename}`
      });
      res.redirect('/');
    } catch(err){
      res.status(400).redirect('/posts/new');
    };
  };

}