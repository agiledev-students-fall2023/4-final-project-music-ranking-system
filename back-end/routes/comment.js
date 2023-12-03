const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const router = express.Router();
const Song = require("../models/song");
const User = require("../models/user");
const mongoose = require('mongoose');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


router.post('/comments/:songArtist/:songTitle/:username/save', async (req, res) => {
  try {
    const song = await Song.findOne({title: req.params.songName, artist: req.params.songArtist});
    const newComment = {
        username: req.body.username,
        comment: req.body.comment,
    }
    const post = song.posts.username(username);
    console.log(song.posts.username);
    post.comments.push(newComment);
    console.log(post.comments);
    await song.save();
    res.json(newComment);
   } 
   catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

router.get('/comments/:songArtist/:songTitle/:username', async(req, res) => {
    const song = await Song.findOne({title: req.params.songTitle, artist: req.params.songArtist});

    if (song) {
        const commentData = {
            comments: song.posts.comments
        }
        console.log(commentData);
        res.json(commentData);
    }
    else {
        res.status(500).json({"Song not found": err});
    }
});

module.exports = router;
