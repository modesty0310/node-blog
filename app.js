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

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(engine);

app.set('views', `${__dirname}/views`);

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

app.post('/posts/store', upload, (req, res) => {
  const image = req.file
  console.log(image);
  Post.create({
    ...req.body,
    image: `/uploads/${image.originalname}`
  }, (err, post) => {
    res.redirect('/');
  });
});

app.get('/contact', (req,res) => {
  res.render('contact')
});


app.listen(4000||port, () => {

  console.log("App listen on port 4000");

});
