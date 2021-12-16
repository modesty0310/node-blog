const express = require('express');
const router = express.Router()
const {createUser, login, logout} = require('../controllers/userAPI');
const { isLoggedIn ,isNotLoggedIn } = require('../middleware/loginChecked');

router.get('/register', isNotLoggedIn, createUser);
router.post('/register', isNotLoggedIn, createUser);
router.get('/login', isNotLoggedIn, login);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);


module.exports = router;