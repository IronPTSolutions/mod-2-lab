const express = require("express");
const users = require("../controllers/users.controller");
const tweets = require("../controllers/tweets.controller");
const router = express.Router();


router.get("/users", users.create);
router.post("/users/doCreate", users.doCreate);
router.get("/users/login", users.login);
router.post("/users/doLogin", users.doLogin);

router.get("/tweets/new", tweets.newTweet);
router.get("/tweets", tweets.list);

module.exports = router;