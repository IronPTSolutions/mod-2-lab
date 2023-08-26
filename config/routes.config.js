const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');
const tweets = require('../controllers/tweets.controller');
const secure = require('../middlewares/secure.mid');

router.get('/register', users.register);
router.post('/register', users.doRegister);
router.get('/login', users.login);
router.post('/login', users.doLogin);
router.get('/profile', secure.isAuthenticated, users.profile);

router.get('/tweets', tweets.list);
router.post('/tweets', secure.isAuthenticated, tweets.doCreate);

module.exports = router;