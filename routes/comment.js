const express = require('express');
const router = express.Router();
const {createComment, deleteComment, updateComment} = require('../controllers/commentAPI');
const { isLoggedIn } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.post('/create/:id', isLoggedIn, createComment);
router.get('/delete/:id', deleteComment);
router.post('/update/:id', updateComment);

module.exports = router;