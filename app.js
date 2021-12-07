const path = require('path');
const express = require('express');
const app = express();
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const multer = require('multer');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost:27017/node-js-blog', {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));

// multer middleware
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename : function(req, file, cb){
    cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
  },
})

let upload = multer({
  storage : storage
}).single('image');

// middleware
const validCreatePostMiddleware = (req, res, next) => {
  if (!req.body.username || !req.body.title || !req.body.subtitle){
    return res.redirect('/posts/new');
  }
  next();
};

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(engine);
app.use('/post/store', validCreatePostMiddleware);

app.set('views', `${__dirname}/views`);

app.get('/', async (req,res) => {
  const posts = await Post.find({})
  console.log(posts);
  res.render('index', {
    posts
  });
});

app.get('/about', (req,res) => {
  res.render('about')
});

app.get('/post/:id', async (req,res) => {
  const post = await Post.findById(req.params.id)
  res.render('post', {
    post
  })
});

app.get('/posts/new', (req, res) => {
  res.render('create')
});

app.post('/posts/store', upload, async (req, res) => {
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
  
});

app.get('/contact', (req,res) => {
  res.render('contact')
});


app.listen(4000||port, () => {

  console.log("App listen on port 4000");

});
