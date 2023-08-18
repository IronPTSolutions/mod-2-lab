const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.create = (req, res, next) => {
  res.render("users/new");
};

module.exports.doCreate = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      userName: req.body.userName,
      password: hash,
      avatar: req.body.avatar,
    })
      .then(() => {
        res.redirect("/login");
      })
      .catch(next);
  });
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
  User.findOne({ userName: req.body.userName }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((match) => {
        if (match) {
          res.redirect("/profile"); // TODO: create session
        } else {
          res.redirect("/login"); // TODO: show error
        }
      });
    } else {
      res.redirect("/login"); // TODO: show error
    }
  });
};