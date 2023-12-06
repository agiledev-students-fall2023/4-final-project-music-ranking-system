// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();
const mongoose = require("mongoose");
const Song = require("../models/song.js");
require("dotenv").config();

router.get("/topSongs", async (req, res) => {
  try {
    const topSongs = await Song.find({}).sort({ numReviews: -1 }).limit(5);
    // .exec();
    let songArr = [];
    topSongs.map((song) => {
      const songItem = {
        albumCover: song.coverSrc,
        artistName: song.artist,
        songName: song.title,
      };
      const songObj = { rating: song.rating, song: songItem };
      songArr.push(songObj);
    });
    songArr.sort((a, b) => b.rating - a.rating);

    res.json(songArr);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router; 


