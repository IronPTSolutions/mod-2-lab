const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String },
    message: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Tweet", schema);

module.exports = User;