const Tweet = require("../models/tweet.model");
const moment = require("moment");
const { rawListeners } = require("../models/user.model");

module.exports.list = (req, res, next) => {
  Tweet.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .then((tweets) => {
      for (let tweet of tweets) {
        const otherDate = moment(tweet.createdAt);
        const difference = moment(otherDate).fromNow();
        tweet.daysSinceCreated = difference;
      }
      res.render("tweets/list", { tweets });
    })
    .catch(() => {});
};

module.exports.listId = (req, res, next) => {
  Tweet.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .then((tweets) => {
      for (let tweet of tweets) {
        const otherDate = moment(tweet.createdAt);
        const difference = moment(otherDate).fromNow();
        tweet.daysSinceCreated = difference;
      }
      res.render("tweets/list", { tweets });
    })
    .catch(() => {});
};

module.exports.create = (req, res, next) => {
  Tweet.find({})
    .populate("user")
    .then(() => {
      res.render("tweets/new");
    })
    .catch(() => {});
};

// module.exports.doCreate = (req, res, next) => {
//   Tweet.create({
//     title: req.body.title,
//     message: req.body.message,
//     createdAt: req.body.createdAt,
//     user: req.user.id,
//     avatar: req.user.avatar,
//   })
//     .then(() => {
//       res.redirect(`/tweets/${req.user.username}`);
//     })
//     .catch((error) => {
//       if (error instanceof mongoose.Error.ValidationError) {
//         res.render("users/new", {
//           tweet: req.body,
//           errors: error.errors,
//         });
//       } else {
//         next(error);
//       }
//     });
// };

module.exports.doCreate = (req, res, next) => {
  Tweet.create({
    tweet: req.body,
    user: req.user.id
  })
    .then(() => {
      res.redirect(`/tweets/${req.user.username}`);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("users/new", {
          tweet: req.body,
          errors: error.errors,
        });
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  Tweet.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect(`/profile/${req.user.id}`);
    })
    .catch(next);
};
