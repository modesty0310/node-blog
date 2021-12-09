const express = require('express');
const router = express.Router()
const UserAPI = require('../controllers/userAPI');

router.get('/register', UserAPI.createUser);
router.post('/store', UserAPI.storeUser);
router.get('/login', UserAPI.loginPage);
router.post('/login', UserAPI.login);

module.exports = router;