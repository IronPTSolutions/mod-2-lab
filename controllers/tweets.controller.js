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
  res.render("/tweets/create");
}; 