// import and instantiate express
const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const router = express.Router();
const Song = require("../models/song");
const User = require("../models/user");

router.get("/:songArtist/:songTitle/:username", async (req, res) => {
  try {
    const song = await Song.findOne({ title: req.params.songTitle, artist: req.params.songArtist });
    // check if song has a post from username
    const post = song.posts.find(post => post.username == req.params.username)
    // if post is empty, send 404
    if (post.length == 0) {
      res.status(404).send("Post not found")
    }
    // otherwise, send song and post
    else{
      res.json({
        song: song,
        post: post
      })
    }
  }
  catch (err) {
    res.status(500).json({"Error retrieving post": err})
  }
});
        

module.exports = router;