const faker = require('@faker-js/faker').faker;
const mongoose = require('mongoose');
require("../config/db.config");

const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");

mongoose.connection.dropDatabase().then(() => {
  User.create([
    {
      name: "Julio",
      username: "Julio",
      password: "12345678",
    },
    {
      name: "Carlos",
      username: "Carlos",
      password: "12345678",
    },
    {
      name: "Cristian",
      username: "Cristian",
      password: "12345678",    
    },
]) 
  .then((users) => {
    console.log("users created");

    for (let i = 0; i < 100; i++) {
      Tweet.create({
        text: faker.lorem.paragraph(3),
        author: users[Math.floor(Math.random() * users.length)]._id,
      }).then((tweet) => {
        console.log("Tweet created");
      }) .catch(console.error);
    }
  })
  .catch(console.error);
});
