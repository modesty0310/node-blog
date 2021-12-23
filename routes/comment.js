const express = require('express');
const router = express.Router();
const {createComment, deleteComment} = require('../controllers/commentAPI');
const { isLoggedIn } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.post('/create/:id', isLoggedIn, createComment);
router.get('/delete/:id', deleteComment);

module.exports = router;