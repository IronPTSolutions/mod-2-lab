const User = require("../models/user.model");


module.exports.create = (req, res, next) => {
  res.render("users/create");
};

module.exports.doCreate = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: hash,
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
  User.findOne({ name: req.body.name }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((match) => {
        if (match) {
          req.session.userId = user.id;
          res.redirect("/users");
        } else {
          res.redirect("/login"); 
        }
      });
    } else {
      res.redirect("/login");
    }
  });
};

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
