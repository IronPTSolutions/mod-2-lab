const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    text: {type: String},
    message: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  }, 
  {
    timestamps: true,
  }); 

const Tweet = mongoose.model("Tweet", schema);

module.exports = Tweet;