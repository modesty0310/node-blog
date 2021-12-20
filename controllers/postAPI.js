const Post = require('../database/models/Post');
const Category = require('../database/models/Category');
const fs = require('fs');

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
  const category = await Category.find();
  if (req.method == "GET") {
      return res.render('create',{
        errors: req.flash('createPostErrors'),
        data: req.flash('data')[0],
        categories: category,
      });
  }else{
    const image = req.file;
    try{
      await Post.create({
        ...req.body,
        image: image ? `${image.filename}` : ''
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
  // multipart/form-data는 multer로 데이터를 받아서 넘겨줘야 req를 사용가능.
  if(req.method == "GET") {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);
      return res.render('update', {post});
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  }else{
    const id = req.params.id;
    const post = await Post.findById(id);
    let newImage = '';
    if(req.file){
      newImage = req.file.filename;
      try {
        console.log('update: ' + `./public${post.image}`);
        fs.unlinkSync(`./public/uploads/${post.image}`);
      } catch (err) {
      }
    }else{
      newImage = post.image;
    }
    const newPost = req.body;
    newPost.image = newImage
    try {
      Post.findByIdAndUpdate(id, newPost, (err, post) => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }; 
  };
}

exports.deletePost = async (req, res, next) => {
  const id = req.params.id;
  const result = await Post.findByIdAndDelete(id);
    if(result.image != ''){
      console.log('delete :' + './public'+result.image);
      try {
        fs.unlinkSync('./public/uploads/'+result.image);
      } catch (err) {
        console.log(err);
      };
    };
  res.redirect('/');
}


