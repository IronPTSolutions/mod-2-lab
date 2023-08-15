module.exports.newTweet = (req, res, next) => { 
  res.render("tweets/newTweet");
};

module.exports.tweets = (req, res, next) => { 
  res.render("tweets/list");
};