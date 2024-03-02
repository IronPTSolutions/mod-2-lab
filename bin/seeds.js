const mongoose =require('mongoose')
require ('../config/db.config')
const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");

mongoose.connection.dropDatabase()
  .then(() => {
    User.create({
      name: "Néboa",
      userName: "neboaneboa",
      pasword: "contraseñachulisima",
      avatar: "https://i.pravatar.cc/150?u=iron-fake@pravatar.com"
    })
    .then((user) => {
      console.log("Usuario  creado:", user);

      return Tweet.create({
        message: "mi primer tweet",
        user: user._id
      });
    })
    .then((tweet) => {
      console.log("Tweet creado:", tweet);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  mongoose.connection.dropDatabase()
  .then(() => {
    User.create({
      name: "Peroo",
      userName: "ksjlkjds",
      pasword: "lsklñsdklñk",
      avatar: "https://i.pravatar.cc/150?u=iron-fake@pravatar.com"
    })
    .then((user) => {
      console.log("Usuario  creado:", user);

      return Tweet.create({
        message: "jajajaja, no",
        user: user._id
      });
    })
    .then((tweet) => {
      console.log("Tweet creado:", tweet);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });