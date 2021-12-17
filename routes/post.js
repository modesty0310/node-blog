const express = require('express');
const router = express.Router();
const {getPost , createPost, updatePost, deletePost} = require('../controllers/postAPI');
//middleware
const upload = require('../middleware/fileUploadMiddleware');
const { isLoggedIn, isAdmin } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/:id', getPost);
router.get('/create', isAdmin, createPost);
router.post('/create', isLoggedIn, upload, createPost);
router.get('/update/:id',isAdmin, updatePost);
router.post('/update/:id',isAdmin, upload, updatePost);
router.get('/delete/:id', isAdmin, deletePost);


module.exports = router;
