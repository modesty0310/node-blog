const express = require('express');
const router = express.Router();
const HomePageAPI = require('../controllers/homePageAPI');

router.get('/contact', (req,res) => {
  res.render('contact')
});
router.get('/about', (req,res) => {
  res.render('about')
});
router.get('/', HomePageAPI);


module.exports = router;