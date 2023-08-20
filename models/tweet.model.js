const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    
    //user : {type: hay que hacer una relación 1 a N},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    message: {type: String},
},
{
    timestamps: true,
})

const Tweet = mongoose.model ('Tweet', schema) ;

module.exports = Tweet