const Tweet = require("../models/tweet.model");

module.exports.list = (req, res, next) => {
  Tweet.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .then((tweets) => {
      res.render("tweets/list", { tweets });
    })
    .catch(err => {
      console.error(err); 
      res.status(500).send('An error occurred while fetching the tweets.');
    });
};

module.exports.listId = (req, res, next) => {
  const tweetId = req.params.id;
  Tweet.findById(tweetId)
    .populate("user")
    .then((tweet) => {
      if (!tweet) {
        res.status(404).send('dont find');
        return;
      }
      res.render("tweets/detail", { tweet });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error');
    });
};

module.exports.create = (req, res, next) => {
  Tweet.find({})
    .populate("user")
    .then(() => {
      res.render("tweets/new");
    })
    .catch(err => {
      console.error(err); 
      res.status(500).send('An error occurred while preparing to create a new tweet.');
    });
};

module.exports.doCreate = (req, res, next) => {
  Tweet.create({
    title: req.body.title,
    message: req.body.message,
    createdAt: req.body.createdAt,
    user: req.user.id,
    avatar: req.user.avatar,
  })
    .then(() => {
      res.redirect(`/tweets/${req.user.username}`);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred while creating the tweet.');
    });
};

module.exports.delete = (req, res, next) => {
  Tweet.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect(`/profile/${req.user.id}`);
    })
    .catch(err => {
      console.error(err); 
      res.status(500).send('An error occurred while deleting the tweet.');
    });
};
