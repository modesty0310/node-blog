const express = require('express');
const router = express.Router();
const PostAPI = require('../controllers/postAPI');
const passport = require('passport');
//middleware
const storePost = require('../middleware/storePost');
const upload = require('../middleware/fileUploadMiddleware');
const auth = require('../middleware/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/loginChecked');


router.get('/create', isLoggedIn, PostAPI.createPost);
router.get('/:id', PostAPI.getPost);
router.post('/create', auth, upload, storePost, isLoggedIn, PostAPI.createPost);

module.exports = router;
