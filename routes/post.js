const express = require('express');
const router = express.Router();
const {getPost , createPost, updatePost, deletePost, getCategory} = require('../controllers/postAPI');
//middleware
const upload = require('../middleware/fileUploadMiddleware');
const { isAdmin } = require('../middleware/loginChecked');

// user 정보 전달
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/create', isAdmin, createPost);
router.post('/create', isAdmin, upload, createPost);
router.get('/update/:id',isAdmin, updatePost);
router.post('/update/:id',isAdmin, upload, updatePost);
router.get('/delete/:id', isAdmin, deletePost);
router.get('/category/:id', getCategory)
// /:id 와 같은 와일드 카드를 사용할 떄는 순서를 잘 생각 한다.
router.get('/:id', getPost);



module.exports = router;
