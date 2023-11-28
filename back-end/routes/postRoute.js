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
    song.posts.map(post => {
      if (post.username == req.params.username){
        res.json({
          song: song,
          post: post
        })
      }
    })
  }
  catch (err) {
    res.status(500).json({"Error retrieving post": err})
  }
});
        

module.exports = router;