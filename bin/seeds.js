const mongoose = require("mongoose");
const faker = require("@faker-js/faker").faker;
require("../config/db.config");

const User = require("../models/user.model");

mongoose.connection.dropDatabase().then(() => {
    User.create({
        name: "Maria",
        userName: "Mabe12",
        password: "maria123",
        avatarUrl: faker.image.url()
    })
    .then((user) => {
        console.log("user created");
    })
    .catch(console.error)
})
.catch(console.error)

