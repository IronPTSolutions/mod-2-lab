const Tweets = require('../models/tweet.model');
const moment = require('moment')


module.exports.create = (req, res, next) => {
    res.render('tweets/create')
}

module.exports.doCreate = (req, res, next) => {
    
    Tweets.create({
        message: req.body.message,
        user: req.session.userId
    })
    .then((tweet) => {
        res.redirect('/profile')
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect('/login')
    }

    Tweets.find({})
        .sort({createdAt: -1})
        .populate("user")
        .then((tweets) => {
            tweets.forEach(tweet => {
                tweet.timeElapsed = moment(tweet.createdAt).fromNow();
            })
            
            res.render('tweets/list', { tweets })
        })
        .catch(() => {});
}

module.exports.delete = (req, res, next) => {
    Tweets.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/profile");
        })
        .catch(next)
}