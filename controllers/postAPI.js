const flash = require('connect-flash/lib/flash');
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
      console.log(flash('createPostErrors'));
      console.log(flash('data')[0]);
        return res.render('create',{
          errors: req.flash('createPostErrors'),
          data: req.flash('data')[0]
        });
    }else{
      const image = req.file;
      console.log(image);
      try{
        await Post.create({
          ...req.body,
          image: image ? `/uploads/${image.filename}` : ''
        });
        return res.redirect('/');      
      } catch(err){
        const createPostErrors = Object.keys(err.errors).map(key => err.errors[key].message);
          
        req.flash('createPostErrors',createPostErrors);
        req.flash('data', req.body);
        res.status(400).redirect('/posts/create');
      };
    };
  };

}