const express = require('express');
const router = express.Router();
//controllers
const users = require("../controllers/user.controller");

//users routes
router.get("/users/new", users.create);
router.post("/users", users.doCreate);
router.get("/login", users.login);
router.post("/login", users.doLogin);

module.exports = router; 