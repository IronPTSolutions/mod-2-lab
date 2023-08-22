const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");


module.exports = session ({
    resave: true,
    saveUninitialized: false,
    secret: "to change",
    store: MongoStore.create ({
        mongoUrl: mongoose.connection._connectionString,

    })
})