const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String},
    userName : {type: String, unique: true},
    password: {type: String},
    avatar: {type: String}

},
{
    timestamps: true,
})

const User = mongoose.model ('User', schema) ;

module.exports = User