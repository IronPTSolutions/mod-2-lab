const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
    res.render("tweets/create.hbs")
}

module.exports.doCreate = (req, res, next) => {
    Tweet.create({
        message: req.body.message
    })
    .then(() => {
        res.redirect("/tweets")
    })
}

module.exports.list = (req, res, next) => {
    console.log(req.body)
    Tweet.find(req.body.message)
        .populate("user")
        .then((Tweet) => {
        console.log(Tweet)
        res.render("tweets/list.hbs", { Tweet } );
    })

}

module.exports.delete = (req, res, next) => {
    Patient.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/profile");
      })
      .catch(next);
  };