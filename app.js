const path = require('path');
const express = require('express');
const app = express();
const { config, engine } = require('express-edge');

app.use(express.static('public'));
app.use(engine);

app.set('views', `${__dirname}/views`)

app.get('/', (req,res) => {
  res.render('index')
});

app.get('/about', (req,res) => {
  res.render('about')
});

app.get('/post', (req,res) => {
  res.render('post')
});

app.get('/contact', (req,res) => {
  res.render('contact')
});
app.listen(4000||port, () => {

  console.log("App listen on port 4000");

});
