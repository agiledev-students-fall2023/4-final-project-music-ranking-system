// import and instantiate express
const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const router2 = express.Router();
const Song = require("../models/song");
const User = require("../models/user");

router.get("/:songArtist/:songTitle/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
      if (!user) {
          res.status(404).json({ error: 'User not found' });
      }
    const song = await Song.findOne({ title: req.params.songTitle, artist: req.params.songArtist });
    if (song) {
      const postResponse = {
        song,
        posts: song.posts,
      }
      res.json(postResponse);
    }
  }
  catch (err) {
    res.status(500).json({"Error finding post": err})
  }
});
        

module.exports = router;