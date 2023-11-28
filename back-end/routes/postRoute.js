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

    // Check if the song exists in the database
    const song = await Song.findOne({ title: req.params.songTitle, artist: req.params.songArtist });
    if (song) {
      const postResponse = {
        song,
        posts: song.posts,
      }
      res.json(postResponse);
    }
    else {
        let token;

        axios.get("http://localhost:3000/spotify/token")
        .then (response => {
          token = response.data.access_token;
        })
        .catch(err => {
          res.status(500).json({"Error fetching Spotify token": err});
        })
        .then(response => {
          axios.get(`https://api.spotify.com/v1/search?q=${req.params.songArtist}+${req.params.songTitle}&type=track&limit=1&offset=0`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then (async response => {
            const songResponse = {
              song: {
                title: response.data.tracks.items[0].name,
                artist: response.data.tracks.items[0].artists[0].name, 
                coverSrc: response.data.tracks.items[0].album.images[1].url, 
                rating: 0,
                numReviews: 0,
                posts: []
              },
            };
            res.json(songResponse);
            })
            .catch (err => {
              res.status(500).json({"Error updating song and review": err});
              console.log(err);
            })
        })
        .catch(err => {
        res.status(500).json({"Error searching": err});
        })
      }
    }
  catch {
    res.status(500).json("Error finding user, song, and review", err);
  }
});
        

module.exports = router;