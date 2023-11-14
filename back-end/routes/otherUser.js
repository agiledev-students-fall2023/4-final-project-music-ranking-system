// import and instantiate express
const express = require("express"); // CommonJS import style!
const router1 = express.Router();


// OtherUserProfile.js requests
router1.get("/other-user/:userId", async (req, res) => {
    const data = {
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
  });
  
  module.exports = router1;