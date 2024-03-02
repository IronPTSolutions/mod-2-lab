const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.create = (req, res, next) => {
    res.render('../users/user.new');
};

module.exports.doCreate = (req, res, next) => {
    bcrypt.hash(req.body.password).then((hash) =>{
        User.create({
            name: req.body.name,
            usarmane: req.body.username,
            password: hash,
            avatar: 'https://i.pravatar.cc/150?u=iron-fake@pravatar.com'
        })
        .then(() => {
            res.redirect("/user.login")
        })
        .catch(next);
    });
};

module.exports.login = (req, res, next) => {
    res.render("/user.login");
  };

  module.exports.doLogin = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((match) => {
          if (match) {
            res.redirect("../tweets"); 
          } else {
            res.redirect("/user.login");
          }
        });
      } else {
        res.redirect("/user.login"); 
      }
    });
  };

  module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("../views/user/login");
  };