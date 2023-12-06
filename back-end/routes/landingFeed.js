// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();
const mongoose = require("mongoose");
const Song = require("../models/song.js");
require("dotenv").config();

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const landingFeedSchema = new mongoose.Schema({
//   artist: {
//     type: String,
//     required: true,
//   },
//   song: {
//     type: String,
//     required: true,
//   },
//   cover: {
//     type: String, // img url?
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   review: {
//     type: String,
//     required: true,
//   },
// });
// const model = mongoose.model("Data", landingFeedSchema);

// router.get("/retrieve", async (req, res) => {
//   try {
//     const data = await model.find({}).exec();
//     if (data.length === 0) {
//       const response = await axios.get(
//         "https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0"
//       );
//       const responseData = response.data;
//       await model.insertMany(responseData);
//       res.json(resdata);
//     } else {
//       res.json(data);
//     }
//   } catch (error) {
//     console.error("Error: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

//ADD CODE SO THAT IF THERE ARE NO REVIEWS IT SHOWS 3 RANDOM SONGS?

//const model = mongoose.model("Data", landingFeedSchema);

// router.get("/retrieve", async (req, res) => {
//   try {
//     const data = await model.find({}).exec();
//     res.json(data);
//   } catch (error) {
//     console.error("Error: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

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
