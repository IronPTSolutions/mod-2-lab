const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        message: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
        createdAt: { type: Date }
},
{
    timestamps: true,
}
)

const Tweet = mongoose.model("Tweet", Schema);
module.exports = Tweet;