const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();
const Song = require("../models/song");
const User = require("../models/User")

//TODO: if manually type in artist and title in params, will automatically fetch spotify api even if already have a database entry, maybe fix? but also might be ok if no one is directly typing in url bar
router.post("/:songArtist/:songTitle/save", async (req, res) =>{
    try {
        const username = req.body.user;
        const rating = parseInt(req.body.rating);
        const review = req.body.review;
        const song = await Song.findOne({title: req.params.songTitle, artist: req.params.songArtist});

        const newPost = {
          username: username,
          rating: rating,
          review: review,
          comments: [],
        };
        const newActivity = {
          review: review,
          rating: rating,
          song: {
            songName: song.title,
            artistName: song.artist,
            albumCover: song.coverSrc,
          },
        };
        User.findOne({ username: username })
          .then((user) => {
            if (user) {
              user.activity.push(newActivity);
              user.save();
            } else {
              console.log("User Does not Exist");
            }
          })
          .catch((error) => {
            console.error("Error finding user:", error);
            res.status(500).send("Internal Server Error");
          });
        song.posts.push(newPost);
        song.numReviews++;
        song.rating = (
          (song.rating * (song.numReviews - 1) + newPost.rating) /
          song.numReviews
        ).toFixed(1);
        await song.save();
        res.json(newPost);
    }
    catch (err){
        res.status(500).json({"Error posting song review": err})
    }
});

router.get("/:songArtist/:songTitle", async (req, res) => {
    //check if already have song saved in database
    const song = await Song.findOne({title: req.params.songTitle, artist: req.params.songArtist})

    // if so, send response with song object
    if (song) {
        res.json(song)
    }
    //if not, query spotify
    else {
        let token;
        //first get spotify token
        axios.get("http://localhost:3000/spotify/token")
        .then (response => {
            token = response.data.access_token
        })
        .catch(err => {
            res.status(500).json({"Error fetching Spotify token": err})
        })
        // then search for song with token
        .then (response => {
            axios.get(`https://api.spotify.com/v1/search?q=${req.params.songArtist}+${req.params.songTitle}&type=track&limit=1&offset=0`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
        // then send response with updated song object + save to database
            .then (async response => {
                const newSong = new Song({
                    title: response.data.tracks.items[0].name, 
                    artist: response.data.tracks.items[0].artists[0].name, 
                    coverSrc: response.data.tracks.items[0].album.images[1].url, 
                    rating: 0,
                    numReviews: 0,
                    posts: []
                })
                await newSong.save()
                res.json(newSong)
            })
            .catch(err => {
                res.status(500).json({"Error updating song object": err})
                console.log(err)
            })
        })
        .catch(err => {
            res.status(500).json({"Error searching Spotify": err})
        })
    }
});

module.exports = router;