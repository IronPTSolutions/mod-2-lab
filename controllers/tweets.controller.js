const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");


module.exports.list = (req, res, next) => { 
  Tweet.find()
    .populate("user")
    .then((tweets) => {
      res.render("/tweets/list", { tweets });
    })
    .catch((err) => {});
};

module.exports.newTweet = (req, res, next) => { 
  Tweet.find()
    .populate("user")
    .then((tweets) => {
      res.render("/tweets/create", { tweets });
    })
    .catch((err) => {});
}; 

module.exports.doCreate = (req, res, next) => {
  tweet.create({
    title: req.body.title,
    message: req.body.message,
    user: req.body.user,
    user: req.user.id,
    avatar: req.body.avatar,
  }) 

    .then((tweet) => {
      res.redirect(`/tweets/${req.user.username}`);
    });
};

module.exports.delete = (req, res, next) => {
  Tweet.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect(`/users/${req.user.id}`);
    })
    .catch((err) => {});
}