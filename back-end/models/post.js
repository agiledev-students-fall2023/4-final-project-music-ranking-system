const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
    },
    rating:{
        type: Number,
    },
    review: {
        type: String,
    },
    comments: [commentSchema],
  })
  

module.exports = mongoose.model("Post", postSchema);
