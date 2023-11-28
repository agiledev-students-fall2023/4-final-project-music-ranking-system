// helpful documentation: https://mongoosejs.com/docs/subdocs.html#adding-subdocs-to-arrays
// https://mongoosejs.com/docs/index.html
// https://mongoosejs.com/docs/populate.html

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  coverSrc: String,
  rating: Number,
  numReviews: Number,
  posts: [postSchema]
});

module.exports = mongoose.model("Song", songSchema);
