const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAuthenticated = require('../middelwares/isAuthenticated');
const tweetsController = require('../controllers/tweets.controller');

// users CRUD
router.get('/registration-form', userController.create);
router.post('/registration-form', userController.doCreate);
router.get('/login', userController.login);
router.post('/login', userController.doLogin);
router.get('/tweets', isAuthenticated, tweetsController.create); 
router.post('/tweets/new', isAuthenticated, tweetsController.doCreate); 

module.exports = router;

