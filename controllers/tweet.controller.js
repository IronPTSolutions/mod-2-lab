const Tweet = require("../models/tweet.model");

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

module.exports.doCreate =(req, res, next) => {
    res.send('doCreate'
    )
}

module.exports.delete =(req, res, next) => {
    res.send('delete' )
}

/*const Tweet = require("../models/tweet.model");




module.exports.list =(req, res) => {
    Post.find ()
    .then((tweets)=> {
        res.render('tweets/list', {tweets})
    })
}*/
