const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        message: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", schema);

module.exports = Post
