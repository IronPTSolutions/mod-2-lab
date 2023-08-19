const faker = require('@faker-js/faker').faker;
const mongoose = require('mongoose');
require("../config/db.config");

const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");

mongoose.connection.dropDatabase().then(() => {
  User.create([
    {
      name: "User1",
      username: "User1",
      password: "12345678",
    },
    {
      name: "User2",
      username: "User2",
      password: "12345678",
    },
    {
      name: "User3",
      username: "User3",
      password: "12345678",    
    },
]) 
  .then((users) => {
    console.log("Created!");

    for (let i = 0; i < 100; i++) {
      Tweet.create({
        text: faker.lorem.paragraph(3),
        author: users._id,
      }).then((tweet) => {
        console.log("Tweeting okey!");
      }) .catch(console.error);
    }
  })
  .catch(console.error);
});