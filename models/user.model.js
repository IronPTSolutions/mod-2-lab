const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: { type: String },
        username: { type: String },
        password: { type: String },
        avatarUrl: { type: String, default: 'https://i.pravatar.cc/150?u=iron-fake@pravatar.com'}
    }
);

schema.virtual('tweets', {
    ref: 'Tweets',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
});

const User = mongoose.model('User', schema);

module.exports = User 