const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {type: String},
    username: {type: String},
    password: {type: String},
    avatarUrl: {type: String},
  }, 
  {
    timestamps: true,
  }); 

const User = mongoose.model("User", schema);

module.exports = User;