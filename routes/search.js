const express = require('express');
const router = express.Router();
const {searchPost} = require('../controllers/searchAPI');

router.get('/', searchPost);

module.exports = router