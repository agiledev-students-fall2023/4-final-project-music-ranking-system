// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();

router.get("/:songId", (req, res) => {
    const song = {
        title: "Title", 
        artist: "Artist",
        rating: 5, 
        numreviews: 10
    }
    res.json(song)
});

module.exports = router;