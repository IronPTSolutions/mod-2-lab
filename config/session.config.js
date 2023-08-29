const expressSession  = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const User = require("../models/user.model");

module.exports.session = expressSession({
  secret: process.env.SESION_SECRET || "super-secret (change it)",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 60 * 60 * 24 * 7, // 1 week 7 días * 24h * 60min * 60seg
  }),
  cookie: {
    httpOnly: true, // NO LE DEJA LEER POR JAVASCRIPT
    secure: process.env.SESION_SECRET === "true", // Seguridad en navegaciones seguras
  },
});

module.exports.loadSessionUser = (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        res.locals.currentUser = user; // crear una variable global
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
};
