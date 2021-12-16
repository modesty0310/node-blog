const express = require('express');
const router = express.Router();
const PostAPI = require('../controllers/postAPI');
//middleware
const storePost = require('../middleware/storePost');
const upload = require('../middleware/fileUploadMiddleware');
const { isLoggedIn } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/create', isLoggedIn, PostAPI.createPost);
router.get('/:id', PostAPI.getPost);
router.post('/create', isLoggedIn, upload, storePost, PostAPI.createPost);

module.exports = router;
