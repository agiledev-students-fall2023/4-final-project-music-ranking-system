// import and instantiate express
const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const router2 = express.Router();

/*Post.js requests to/from API
router2.get("/post/:postId", async (req, res) => {
    const postID = parseInt(req.params.postId);
    //res.send({ postId: postID });
    try {
      const apiResponse = await axios.get(
        "https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0"
      );
      const resdata = apiResponse.data;
      //res.send(resdata);
      const foundData = resdata.find((item) => item.id === postID);
      //res.send(foundData);
      if (foundData) {
        res.json(foundData);
      } else {
        res.status(404).json({ error: "Error data" });
      }
    } catch (error) {
      //console.error("Error fetching data from API:", error);
      res.status(500).json({ error: "Internal Server Error:" });
    }
  });
  */

  let song = {
    rating:5,
    numReviews: 10,
    review: "Banger",
  }
  router2.get("post/:songArtist/:songTitle", (req, res) => {
    let token;
    //first get spotify token
    axios.get("http://localhost:3000/spotify/token")
    .then (response => {
        token = response.data.access_token
    })
    .catch(err => {
        console.log("Error fetching Spotify token:", err)
      })
    // then search for song with token
    .then (response => {
        axios.get(`https://api.spotify.com/v1/search?q=${req.params.songArtist}+${req.params.songTitle}&type=track&limit=1&offset=0`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
    // then send response with updated song object
        .then (response => {
            song.artist = response.data.tracks.items[0].artists[0].name
            song.title = response.data.tracks.items[0].name
            song.coverSrc = response.data.tracks.items[0].album.images[1].url
            res.json(song)
        })
    })
    .catch(err => {
        console.log("Error searching Spotify:", err)
      })
});

module.exports = router2;