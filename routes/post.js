const express = require('express');
const router = express.Router();
const PostAPI = require('../controllers/postAPI');
//middleware
const upload = require('../middleware/fileUploadMiddleware');
const { isLoggedIn, isAdmin } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/create',isAdmin, isLoggedIn, PostAPI.createPost);
router.get('/:id', PostAPI.getPost);
router.post('/create', isLoggedIn, upload, PostAPI.createPost);

module.exports = router;
