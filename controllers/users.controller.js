const User = require('../models/user.model')
const bcrypt = require('bcrypt');

module.exports.create = (req, res, next) => {
    res.render('users/new')
}

module.exports.doCreate = (req, res, next) => {

    bcrypt.hash(req.body.password, 10).then((hash) => {

        User.create({
            name: req.body.name,
            username: req.body.username,
            password: hash,
            avatarUrl: req.body.avatarUrl,
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch((error) => res.status(500).send('Error al registrar el usuario: ' + error))
    }) 

}

module.exports.login = (req, res, next) => {
    res.render("users/login");
}

module.exports.doLogin = (req, res, next) => {
    
    User.findOne({username: req.body.username}).then((user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password).then((match) => {
                if(match){
                    req.session.userId = user.id;
                    res.redirect("/profile")
                } else {
                    res.redirect('/login')
                }
            }) 
        } else {
            res.redirect("/login")
        }
    })

}

module.exports.profile = (req, res, next) => {
    User.findById(req.session.userId)
        .populate('tweets')
        .then(userWithTweets => {
            
            res.render('users/profile', { user: userWithTweets })
            
        })
        .catch(next)
}
