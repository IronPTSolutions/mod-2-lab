const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String },
    message: { type: String, required: "Tweet message is required", },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Tweet", schema);

module.exports = Tweet;
