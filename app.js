const express = require('express');
const app = express();
// controller
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
//middleware
const storePost = require('./middleware/storePost');
const upload = require('./middleware/fileUploadMiddleware')
// DB connect
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-js-blog', {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));
// middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use('/post/store', storePost);

// view engine
const { engine } = require('express-edge');
app.use(engine);
app.set('views', `${__dirname}/views`);

// router
app.get('/', homePageController);
app.get('/about', (req,res) => {
  res.render('about')
});
app.get('/post/:id', getPostController);
app.get('/posts/new', createPostController);
app.post('/posts/store', upload, storePostController);
app.get('/auth/register', createUserController);
app.post('/users/register', storeUserController);
app.get('/contact', (req,res) => {
  res.render('contact')
});

app.listen(4000||port, () => {
  console.log("App listen on port 4000");
});
