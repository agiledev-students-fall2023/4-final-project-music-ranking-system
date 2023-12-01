// import and instantiate express
const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const router = express.Router();
const Song = require("../models/song");
const User = require("../models/user");

router.post("/:songArtist/:songTitle/:username/save", async (req, res) => {
  try {
    console.log("HERE2");
    const song = await Song.findOne({
      title: req.params.songTitle,
      artist: req.params.songArtist,
    });
    // check if song has a post from username
    const post = song.posts.find(
      (post) => post.username == req.params.username
    );
    // if post exists, add comment to post
    if (post) {
      const newComment = {
        username: req.body.username,
        comment: req.body.comment,
      };
      post.comments.push(newComment);
      await song.save();
      console.log(post);
      res.json(newComment);
    }
    // otherwise, send 404
    else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    res.status(500).json({ "Error retrieving post": err });
  }
});

router.get("/:songArtist/:songTitle/:username", async (req, res) => {
  try {
    const song = await Song.findOne({
      title: req.params.songTitle,
      artist: req.params.songArtist,
    });
    console.log("song: ", song);

    // check if song has a post from username
    const post = song.posts.find(
      (post) => post.username == req.params.username
    );
    console.log("post: ", post);
    // if post exists, send song and post
    if (post && song) {
      res.json({
        song: song,
        post: post,
      });
    }
    // otherwise, send 404
    else {
      res.status(404).send("Post not found");
    }
  } catch (err) {
    res.status(500).json({ "Error retrieving post": err });
  }
});

module.exports = router;
