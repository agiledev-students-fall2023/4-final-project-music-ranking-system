// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();

//TODO: figure out spotify search
//TODO: once database implemented, remove postArr
//TODO: in post /save, add numReviews and change ratings
let postArr = []
router.post("/save", (req, res) =>{
    console.log(req.body.rating)
    console.log(req.body.review)
    const newPost = {
        user: req.body.user, 
        rating: req.body.rating, 
        review: req.body.review
    } 
    postArr = [newPost, ...postArr]
    console.log(postArr)
    res.json(newPost)
});
router.get("/:songId", (req, res) => {
    const song = {
        title: "Title", 
        artist: "Artist",
        coversrc: "https://picsum.photos/200",
        rating: 5, 
        numreviews: 10,
        posts: postArr
    }
    res.json(song)
});

module.exports = router;