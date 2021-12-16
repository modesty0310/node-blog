const express = require('express');
const router = express.Router()
const UserAPI = require('../controllers/userAPI');
const redirectIfAuth = require('../middleware/redirectIfAuth');
const { isLoggedIn ,isNotLoggedIn } = require('../middleware/loginChecked');

router.get('/register', isNotLoggedIn, redirectIfAuth, UserAPI.createUser);
router.post('/register', isNotLoggedIn, redirectIfAuth, UserAPI.createUser);
router.get('/login', isNotLoggedIn, redirectIfAuth, UserAPI.login);
router.post('/login', isNotLoggedIn, redirectIfAuth, UserAPI.login);
router.get('/logout', isLoggedIn, redirectIfAuth, UserAPI.logout);


module.exports = router;