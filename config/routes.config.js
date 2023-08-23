const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');

router.get('/register', users.register);
router.post('/register', users.doRegister);

module.exports = router;