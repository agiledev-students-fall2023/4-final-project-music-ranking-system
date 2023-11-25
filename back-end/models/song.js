// helpful documentation: https://mongoosejs.com/docs/subdocs.html#adding-subdocs-to-arrays
// https://mongoosejs.com/docs/index.html

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: String,
    comment: String
})

const postSchema = new mongoose.Schema({
  username: {
      type: String,
      unique: true,
  },
  rating:{
      Type: Number,
  },
  review: {
      type: String,
  },
  comments: [commentSchema],
})

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  coverSrc: String,
  rating: Number,
  numReviews: Number,
  posts: [postSchema]
});

module.exports = mongoose.model("Song", songSchema);
