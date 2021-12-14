const express = require('express');
const router = express.Router()
const UserAPI = require('../controllers/userAPI');
const redirectIfAuth = require('../middleware/redirectIfAuth');

router.get('/register', redirectIfAuth, UserAPI.createUser);
router.post('/register', redirectIfAuth, UserAPI.createUser);
router.get('/login', redirectIfAuth, UserAPI.login);
router.post('/login', redirectIfAuth, UserAPI.login);

module.exports = router;