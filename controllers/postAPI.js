const Post = require('../database/models/Post');

module.exports = class PostAPI {

  static async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      res.render('post', {
        post
      });
    } catch (err) {
      res.status(400).json({message:err});
    };
    
  };

  static async createPost(req, res) {
    if (req.method == "GET") {
        return res.render('create');
    }else{
      const image = req.file;
      try{
        await Post.create({
          ...req.body,
          image: `/uploads/${image.filename}`
        });
        return res.redirect('/');      
      } catch(err){
        console.log(err);
        res.status(400).redirect('/posts/create');
      };
    };
  };

}