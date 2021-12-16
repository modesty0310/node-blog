const express = require('express');
const router = express.Router();
const HomePageAPI = require('../controllers/homePageAPI');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/contact', (req,res) => {
  res.render('contact')
});
router.get('/about', (req,res) => {
  res.render('about')
});
router.get('/', HomePageAPI);


module.exports = router;