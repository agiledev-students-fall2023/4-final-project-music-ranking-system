// import and instantiate express
const express = require("express"); // CommonJS import style!
const router1 = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// OtherUserProfile.js requests
router1.get("/other-user/:userId", async (req, res) => {
  const user_to_find = req.params.userId;

  User.findOne({ username: user_to_find })
    .then((user) => {
      if (user) {
        // Display the user information
        res.json(user);
      } else {
        res.send('User not found');
      }
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).send('Internal Server Error');
    });

    /*const data = {
      userId: req.params.userId,
      topSongs: [
        {
          songName: "Born To Die",
          artistName: "Lana Del Rey",
          albumCover: "https://picsum.photos/200",
        },
        {
          songName: "Candy",
          artistName: "Doja Cat",
          albumCover: "https://picsum.photos/200",
        },
        {
          songName: "Heartless",
          artistName: "The Weeknd",
          albumCover: "https://picsum.photos/200",
        },
        {
          songName: "Popular",
          artistName: "The Weeknd",
          albumCover: "https://picsum.photos/200",
        },
      ],
  
      activity: [
        {
          review:
            "Love this song! My favorite! Pretend I came up with some more positive comments!",
          rating: 9,
          songName: "Shake It Off",
          artistName: "Taylor Swift",
        },
        {
          review:
            "This song sucks. Overrated. Cannot open Tiktok wo hearing it this is so overplayed.",
          rating: 2,
          songName: "Lose Yourself",
          artistName: "Eminem",
        },
        {
          review:
            "This song is good, but no where near as much as everyone is saying. Mid.",
          rating: 6,
          songName: "Passionfruit",
          artistName: "Drake",
        },
      ],
    };
    res.json(data);
    */
  });
  
  module.exports = router1;