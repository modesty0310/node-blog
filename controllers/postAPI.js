const Post = require('../database/models/Post');

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('post', {
      post
    });
  } catch (err) {
    res.status(400).json({message:err});
  };
  
};

exports.createPost = async (req, res) => {
  if (req.method == "GET") {
      return res.render('create',{
        errors: req.flash('createPostErrors'),
        data: req.flash('data')[0]
      });
  }else{
    const image = req.file;
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

exports.updatePost = async (req, res, next) => {
  if(req.method == "GET") {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.render('update', {post});
  }
  
}
