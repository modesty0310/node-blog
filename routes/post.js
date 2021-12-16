const express = require('express');
const router = express.Router();
const PostAPI = require('../controllers/postAPI');
const passport = require('passport');
//middleware
const storePost = require('../middleware/storePost');
const upload = require('../middleware/fileUploadMiddleware');
const auth = require('../middleware/auth');
const { isLoggedIn } = require('../middleware/loginChecked');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/create', isLoggedIn, PostAPI.createPost);
router.get('/:id', PostAPI.getPost);
router.post('/create', isLoggedIn, auth, upload, storePost, PostAPI.createPost);

module.exports = router;
