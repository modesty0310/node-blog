const express = require('express');
const router = express.Router();
const {createComment} = require('../controllers/commentAPI');
const { isLoggedIn } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.post('/create/:id', isLoggedIn, createComment);

module.exports = router;