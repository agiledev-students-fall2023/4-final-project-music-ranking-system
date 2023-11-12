const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();

//TODO: figure out spotify search
//TODO: once database implemented, remove postArr and song
//TODO: in post /save, maybe change rating equation? currently disregards any individual ratings, so decimal points are kind of off
let postArr = []
let song = {
    title: "Title", 
    artist: "Artist",
    coverSrc: "https://picsum.photos/200",
    rating: 5, 
    numReviews: 10,
    posts: postArr
}
router.post("/:songArtist/:songTitle/save", (req, res) =>{
    const newPost = {
        user: req.body.user, 
        rating: parseInt(req.body.rating), 
        review: req.body.review
    } 
    postArr = [newPost, ...postArr]
    song.numReviews++
    song.rating = ((song.rating * (song.numReviews-1) + newPost.rating)/song.numReviews).toFixed(1)
    res.json(newPost)
});
router.get("/:songArtist/:songTitle", (req, res) => {
    song.title = req.params.songTitle
    song.artist = req.params.songArtist
    res.json(song)
});

module.exports = router;