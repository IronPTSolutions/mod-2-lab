const express = require("express");
const users = require("../controllers/users.controller");
const tweets = require("../controllers/tweets.controller");
const router = express.Router();


router.get("/users", users.create);
router.post("/users/doCreate", users.doCreate);
router.get("/users/login", users.login);
router.post("/users/doLogin", users.doLogin);


router.get("/tweets/create", tweets.newTweet);
router.post("/tweets/doCreate", tweets.doCreate);
router.get("/tweets/list", tweets.list);
router.post("/tweets/:id/delete", secure.check, tweets.delete);

module.exports = router;