const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
    name: { type: String },
    userName: { type: String }, 
    password: { type: String },
    avatarUrl: { type: String, }
}
);

schema.virtual('tweets', {
    ref: 'Tweet',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
});

const User = mongoose.model("User", schema);

module.exports = User