require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5000;
// routes
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');
// DB connect
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database" + process.env.SESSIONN_SECRET))
  .catch((err) => console.log(err));
// middleware 
app.use(session({
  secret: process.env.SESSIONN_SECRET,
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


// view engine
const { engine } = require('express-edge');
app.use(engine);
app.set('views', `${__dirname}/views`);

// router
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/', indexRouter);

app.listen( port , () => {
  console.log(`App listen on port ${port}`);
});
