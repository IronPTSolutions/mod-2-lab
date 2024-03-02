const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");
const mongoose = require("mongoose");

module.exports.create = (req, res, next) => {
  res.render("users/new");
};

module.exports.doCreate = (req, res, next) => {
  // Sirve para eleminar un parametro antes de enviarlo
  delete req.body.role;
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.render("users/new", {
          user: req.body,
          errors: {
            username: "Username already exists",
          },
        });
      } else {
        return User.create(req.body).then(() => res.redirect("/login"));
      }
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/new", {
          user: req.body,
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render("users/login");
};

module.exports.doLogin = (req, res, next) => {
  function renderInvalidUsername() {
    res.render("users/login", {
      user: req.body,
      errors: {
        password: "Invalid username or password",
      },
    });
  }

  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return user.checkPassword(req.body.password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            res.redirect(`/tweets/${req.session.userId}`);
          } else {
            renderInvalidUsername();
          }
        });
      } else {
        renderInvalidUsername();
      }
    })
    .catch((error) => next(error));
};

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render("users/edit", { user });
    })
    .catch(next);
};

module.exports.doEdit = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    user: req.body,
  })
    .then((user) => {
      res.redirect(`/profile/${user.id}`);
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  Tweet.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .populate("user")
    .then((data) => {
      if (data.length > 0) {
        const cantDelete = data && data.map((i) => i.user.id === req.user.id);
        res.render("users/profile", {
          user: data[0].user,
          tweets: data,
          cantDelete: cantDelete[0],
        });
      } else {
        User.findById(req.params.id)
          .sort({ createdAt: -1 })
          .populate("user")
          .then((user) => {
            res.render("users/profile", {
              user: user,
              tweets: [],
              cantDelete: false,
            });
          });
      }
    })

    .catch(next);
};
