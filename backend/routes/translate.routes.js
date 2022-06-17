'use strict';
const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../controllers/middleware_jwt');

router.use(cors());

const translate = require('../controllers/translate.controller');

router.post('/translateData', auth.auth, translate.translateData);

module.exports = router;
