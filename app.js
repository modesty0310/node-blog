require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectFlash = require('connect-flash');
const { queryParser } = require('express-query-parser')
const passport = require('passport');
const passportConfig = require('./passport');
const app = express();
const port = process.env.PORT || 5000;
// routes
const searchRouter = require('./routes/search');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');
// DB connect
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => console.log(err));
// middleware 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSIONN_SECRET,
  // store: MongoStore.create({
  //   mongoUrl: process.env.DB_URI
  // }),
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true
  })
);
app.use(connectFlash());
passportConfig();
app.use(passport.initialize());
app.use(passport.session());


// view engine
const { engine } = require('express-edge');
app.use(engine);
app.set('views', `${__dirname}/views`);

// router
app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
// 신기하게 postRouter 안에서 search로 get을 받으면 경로를 읽지 못한다. 
app.use('/search', searchRouter);


app.listen( port , () => {
  console.log(`App listen on port ${port}`);
});
