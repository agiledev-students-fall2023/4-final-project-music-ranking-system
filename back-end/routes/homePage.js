// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();
const User = require("../models/user");

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

router.post("/", (req, res) => {
  username = req.body.username;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        const following = user.following;

        const resdata = [];

        User.find({ _id: { $in: following } }, "activity")
          .then((users) => {
            const activities = users.map((userP) => userP.activity).flat();
            // console.log(activities.length);
            return res.json(activities);
          })
          .catch((err) => {
            console.error("Error finding users by ids:", err);
            // Handle the error
          });
      } else {
        console.log("User Does not Exist");
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;

// const express = require("express");
// const axios = require("axios");
// const router = require("express").Router();

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

// // Spotify API endpoints
// const tokenUrl = "https://accounts.spotify.com/api/token";
// const genreUrl =
//   "https://api.spotify.com/v1/recommendations/available-genre-seeds";
// const playlistUrl =
//   "https://api.spotify.com/v1/browse/categories/{category_id}/playlists";

// Middleware to obtain and set the Spotify access token
// const getAccessToken = async () => {
//   const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
//     "base64"
//   );

//   const data = new URLSearchParams({
//     grant_type: "client_credentials",
//   });

//   const response = await axios.post(
//     "https://accounts.spotify.com/api/token",
//     data,
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${credentials}`,
//       },
//     }
//   );
//   return response.data.access_token;
// };

// // Endpoint to render the page with a dropdown menu of genres
// router.get("/", async (req, res) => {
//   try {
//     // Get the list of available genres
//     const accessToken = await getAccessToken();
//     // console.log(accessToken);
//     const genreResponse = await axios.get(genreUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     const genres = genreResponse.data.genres;

//     // Render the page with the dropdown menu
//     res.json;
//   } catch (error) {
//     console.error("Error fetching available genres:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Endpoint to get top songs for the selected genre
// router.get("/top-songs/:genre", async (req, res) => {
//   const { genre } = req.params;

//   try {
//     // Get Top Tracks for the Specified Genre
//     const playlistResponse = await axios.get(
//       playlistUrl.replace("{category_id}", genre),
//       {
//         headers: { Authorization: `Bearer ${req.spotifyAccessToken}` },
//       }
//     );

//     // Extract and send track information
//     const tracks = playlistResponse.data.playlists.items.map(
//       (playlist) => playlist.tracks.items
//     );
//     res.json({ genre, tracks });
//   } catch (error) {
//     console.error("Error fetching top songs:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
