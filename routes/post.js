const express = require('express');
const router = express.Router();
const PostAPI = require('../controllers/postAPI');
//middleware
const storePost = require('../middleware/storePost');
const upload = require('../middleware/fileUploadMiddleware');


router.get('/new', PostAPI.createPost);
router.get('/:id', PostAPI.getPost);
router.post('/store', upload, storePost, PostAPI.storePost);

module.exports = router;
