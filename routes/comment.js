const express = require('express');
const router = express.Router();
const {createComment} = require('../controllers/commentAPI');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.post('/create', createComment);

module.exports = router;