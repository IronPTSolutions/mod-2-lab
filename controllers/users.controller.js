const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.create = (req, res, next) => {
    res.render("users/new")
};

module.exports.doCreate = (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10).then((hash) => {
        User.create({
            name: req.body.name,
            userName: req.body.userName,
            password: hash,
            avatarUrl: req.body.avatarUrl
        })
        .then(() => {
            res.redirect("/login");
        })
    })
};

module.exports.details = (req, res, next) => {
    console.log(req.session)
    const userId = req.session.userId
    User.findById(userId)
    .populate("tweets")
    .then((user) => {
        res.render("users/profile", { user } );
    })

}

module.exports.login = (req, res, next) => {
    res.render("users/login")
};

module.exports.doLogin = (req, res, next) => {
    User.findOne( { userName: req.body.userName } )
    .then((user => {
        if (user) {
            console.log(user)
            req.session.userId = user._id

            bcrypt.compare( req.body.password, user.password).then(match => {
                if (match) {
                    res.redirect("/profile")
                }
                else {
                    res.redirect("/login")
                }
            })
        }
        else {
            res.redirect("/login")
        }
    }))
}

