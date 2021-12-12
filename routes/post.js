const express = require('express');
const router = express.Router();
const PostAPI = require('../controllers/postAPI');
//middleware
const storePost = require('../middleware/storePost');
const upload = require('../middleware/fileUploadMiddleware');
const auth = require('../middleware/auth')


router.get('/create', auth, PostAPI.createPost);
router.get('/:id', PostAPI.getPost);
router.post('/create', auth, upload, storePost, PostAPI.createPost);

module.exports = router;
