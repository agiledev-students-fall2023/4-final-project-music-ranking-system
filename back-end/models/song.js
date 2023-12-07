// helpful documentation: https://mongoosejs.com/docs/subdocs.html#adding-subdocs-to-arrays
// https://mongoosejs.com/docs/index.html

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: { type: String, sparse: true },
  comment: { type: String, sparse: true },
});

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    sparse: true,
  },
  rating: {
    type: Number,
    sparse: true,
  },
  review: {
    type: String,
    sparse: true,
  },
  comments: [commentSchema],
});

const songSchema = new mongoose.Schema({
  title: { type: String, sparse: true },
  artist: { type: String, sparse: true },
  coverSrc: { type: String, sparse: true },
  rating: { type: Number, sparse: true },
  numReviews: { type: Number, sparse: true },
  posts: [postSchema],
});

module.exports = mongoose.model("Song", songSchema);
