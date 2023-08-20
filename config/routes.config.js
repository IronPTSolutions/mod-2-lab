const express = require('express');
const router = express.Router();
//controllers
const users = require("../controllers/user.controller");
const tweets = require("../controllers/tweet.controller")
//middlewares
//const secure = ('..middlewares/secure.middleware')


//users routes
router.get("/users/new", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login);
router.get("/users/:id", users.detail);
router.post("/login", users.doLogin);

//tweets routes 
router.get("/tweets", tweets.list);
router.get("/tweets/new", tweets.create);
router.post("/tweets", tweets.doCreate);
router.post("/tweets/:id/delete", tweets.delete)

router.get("/", (req,res) => res.redirect ("/tweets"));

module.exports = router; 