const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const tweets = require("../controllers/tweets.controller");
const secure = require("../middlewares/secure.middleware");

router.get("/", (req, res) => res.redirect("/profile")); // BETTER TO REDIRECT TO /HOME OR /TWEETS?
router.get("/users/new", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.get("/profile", users.details);

router.get("/tweets/new", secure.check, tweets.create);
router.post("/tweets", secure.check, tweets.doCreate);
router.get("/tweets", tweets.list);
router.post('/tweets/:id/delete', tweets.delete)


module.exports = router