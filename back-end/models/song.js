const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: String,
    comment: String
})

const postSchema = new mongoose.Schema({
    username: String,
    rating: Number,
    review: String,
    comments: [commentSchema]
})

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  coverSrc: String,
  numReviews: Number,
  posts: [postSchema]
});

module.exports = mongoose.model("Song", songSchema);
