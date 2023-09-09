const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller");
const tweets = require("../controllers/tweets.controller");
const secure = require("../middlewares/secure.middleware");

router.get("/tweets/new", secure.isAuthenticated, tweets.create);
router.post("/tweets", secure.isAuthenticated, tweets.doCreate);
router.get("/tweets", tweets.list);
router.get("/tweets/:id", secure.isAuthenticated, tweets.listId);
router.post("/tweets/:id/delete", secure.isAuthenticated, tweets.delete);
// CRUD USER
router.get("/users/new", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.get("/profile/:id", secure.isAuthenticated, users.profile);
router.get("/profile/:id/edit", secure.isAuthenticated, users.edit);
router.post("/profile/:id", secure.isAuthenticated, users.doEdit);
router.post("/logout", secure.isAuthenticated, users.logout);

module.exports = router;
