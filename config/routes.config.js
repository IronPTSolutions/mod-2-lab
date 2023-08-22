const express = require("express");
const router = express.Router();

const users = require("../controllers/users.controller.js");
const tweets = require("../controllers/tweets.controller");
const secure = require("../middlewares/secure.middleware");

// --- TWEETS ROUTES ---

// Create
router.get("/tweets/new", secure.check, tweets.create);
router.post("/tweets", secure.check, tweets.doCreate);

// Read
router.get("/tweets", tweets.list);
router.get("/tweets/:id", secure.check, tweets.listId);

// Delete
router.post("/tweets/:id/delete", secure.check, tweets.delete);

// --- USER ROUTES ---

// Create
router.get("/users/new", users.create);
router.post("/users", users.doCreate);

// Read
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.get("/profile/:id", secure.check, users.profile);

// Update
router.get("/profile/:id/edit", secure.check, users.edit);
router.post("/profile/:id", secure.check, users.doEdit);

// Delete/Logout
router.post("/logout", secure.check, users.logout);

// --- DEFAULT REDIRECTION ---
router.get("/", (req, res) => res.redirect("/tweets"));

module.exports = router;
