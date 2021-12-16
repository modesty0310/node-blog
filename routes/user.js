const express = require('express');
const router = express.Router()
const UserAPI = require('../controllers/userAPI');
const { isLoggedIn ,isNotLoggedIn } = require('../middleware/loginChecked');

router.get('/register', isNotLoggedIn, UserAPI.createUser);
router.post('/register', isNotLoggedIn, UserAPI.createUser);
router.get('/login', isNotLoggedIn, UserAPI.login);
router.post('/login', isNotLoggedIn, UserAPI.login);
router.get('/logout', isLoggedIn, UserAPI.logout);


module.exports = router;