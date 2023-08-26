const Tweet = require('../models/tweet.model');
const mongoose = require('mongoose');

module.exports.doCreate = (req, res, next) => {
  Tweet.create({
    message: req.body.message,
    user: req.user.id
  })
  .then(() => res.redirect('/tweets'))
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.keys(error.errors).reduce((errors, attr) => {
        errors[attr] = error.errors[attr].message
        return errors;
      }, {})

      req.flash('data', JSON.stringify({ tweet: req.body, errors: errors }));
      res.redirect('/tweets');
    } else {
      next(error);
    }
  })
};

module.exports.list = (req, res, next) => {
  Tweet.find()
    .populate({
      path: 'user',
      select: 'username avatarUrl'
    })
    .sort({ createdAt: -1 })
    .then((tweets) => res.render('tweets/list', { tweets }))
    .catch((error) => next(error));
}