const express = require('express');
const router = express.Router()
const UserAPI = require('../controllers/userAPI');

router.get('/register', UserAPI.createUser);
router.post('/store', UserAPI.storeUser);

module.exports = router;