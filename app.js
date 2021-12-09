require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// controller
const homePageController = require('./controllers/homePage');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
// routes
const postRouter = require('./routes/post');
// DB connect
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));
// middleware 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// view engine
const { engine } = require('express-edge');
app.use(engine);
app.set('views', `${__dirname}/views`);

// router
app.get('/', homePageController);
app.use('/posts', require('./routes/post'));
app.get('/auth/register', createUserController);
app.post('/users/register', storeUserController);
app.get('/about', (req,res) => {
  res.render('about')
});
app.get('/contact', (req,res) => {
  res.render('contact')
});

app.listen( port , () => {
  console.log(`App listen on port ${port}`);
});
