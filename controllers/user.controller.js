const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Tweet = require("../models/tweet.model");

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

const sessions = {}

module.exports.doLogin = (req, res, next) => {
  User.findOne({ userName: req.body.userName }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((match) => {
        if (match) {
           req.session.userId = user.id
          res.redirect("/tweets"); // TODO: create session
        } else {
          res.redirect("/login"); // TODO: show error
        }
      });
    } else {
      res.redirect("/login"); // TODO: show error
    }
  });
};

module.exports.detail = (req, res, next) => {
    
    User.findById(req.params.id)
        
      .then((user) => {
        if (!user) {
            return res.status(404).send("User not found");
        }

        Tweet.find({ user: user._id })
        .populate('user')
          .then((tweets) => {
            res.render("users/detail", { user, tweets });
          })
          .catch(next);
      })
      .catch(next);
};

module.exports.sessions = sessions;