const path = require('path');
const express = require('express');
const app = express();
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');

const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost:27017/node-js-blog', {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));

app.use(fileupload());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(engine);

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

app.post('/posts/store', (req, res) => {
  console.log(req.file);
  // const { image } = req.files;
  // image.mv(path.resolve(__dirname, 'public/posts', image.name), err => {
  //   Post.create(req.body, (err, post) => {
  //     res.redirect('/');
  //   });
  // });
});

app.get('/contact', (req,res) => {
  res.render('contact')
});


app.listen(4000||port, () => {

  console.log("App listen on port 4000");

});
