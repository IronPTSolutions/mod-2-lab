const Tweet = require("../models/tweet.model");
const user = require('./user.controller');
const bcrypt = require("bcrypt");

module.exports.list =(req, res, next) => {
    Tweet.find()
    
    .populate ('user')
    .then((tweets)=>{
       res.render('./tweets/list', {tweets}) 
    })
    .catch(()=>{})
}

module.exports.create =(req, res, next) => {
   
    res.render("tweets/new");
}

module.exports.doCreate = (req, res, next) => {
    const userId = req.session.userId;
    
    if (!userId) {
        return res.redirect('/login'); 
    }
    
    Tweet.create({
        user: userId,
        message: req.body.message,
    })
    .then(() => {
        res.redirect("/tweets");
    })
    .catch(next);
}


module.exports.delete =(req, res, next) => {
   module.exports.delete = (req, res, next) => {
    const userId = req.session.userId; 
    const tweetId = req.params.id; 

    if (!userId) {
        return res.redirect('/login'); 
    }

   
    Tweet.findOne({ _id: tweetId, user: userId })
        .then((tweet) => {
            if (!tweet) {
                return res.redirect('/tweets'); 
            }

            
            tweet.remove()
                .then(() => {
                    res.redirect('/tweets');
                })
                .catch(next);
        })
        .catch(next);
}
}

/*const Tweet = require("../models/tweet.model");




module.exports.list =(req, res) => {
    Post.find ()
    .then((tweets)=> {
        res.render('tweets/list', {tweets})
    })
}*/
