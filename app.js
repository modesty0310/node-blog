const express = require('express');
const app = express();
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

//middleware
const validCreatePostMiddleware = require('./middleware/storePost');
const upload = require('./middleware/fileUploadMiddleware')

mongoose.connect('mongodb://localhost:27017/node-js-blog', {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));



// middleware


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(engine);
app.use('/post/store', validCreatePostMiddleware);
app.set('views', `${__dirname}/views`);

app.get('/', homePageController);

app.get('/about', (req,res) => {
  res.render('about')
});

app.get('/post/:id', getPostController);

app.get('/posts/new', createPostController);

app.post('/posts/store', upload, storePostController);

app.get('/contact', (req,res) => {
  res.render('contact')
});


app.listen(4000||port, () => {

  console.log("App listen on port 4000");

});
