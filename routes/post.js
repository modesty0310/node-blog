const express = require('express');
const router = express.Router();
const PostAPI = require('../controllers/postAPI');
//middleware
const storePost = require('../middleware/storePost');
const upload = require('../middleware/fileUploadMiddleware');


router.get('/create', PostAPI.createPost);
router.get('/:id', PostAPI.getPost);
router.post('/create', upload, storePost, PostAPI.createPost);

module.exports = router;
