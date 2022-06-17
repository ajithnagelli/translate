'use strict';
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const user = require('../controllers/user.controller');

router.post('/login', user.login);
router.post('/register', user.register);

module.exports = router;
