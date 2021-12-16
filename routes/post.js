const express = require('express');
const router = express.Router();
const {getPost , createPost, updatePost} = require('../controllers/postAPI');
//middleware
const upload = require('../middleware/fileUploadMiddleware');
const { isLoggedIn, isAdmin } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/create',isAdmin, isLoggedIn, createPost);
router.get('/:id', getPost);
router.post('/create', isLoggedIn, upload, createPost);
router.get('/update/:id', updatePost)

module.exports = router;
