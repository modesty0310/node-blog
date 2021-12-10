const express = require('express');
const router = express.Router()
const UserAPI = require('../controllers/userAPI');

router.get('/register', UserAPI.createUser);
router.post('/register', UserAPI.createUser);
router.get('/login', UserAPI.login);
router.post('/login', UserAPI.login);

module.exports = router;