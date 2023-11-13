const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();
const env = require('dotenv').config();

// SEND GRADER .ENV FILE!!!!
// rn, everytime call /spotify/token, generates a new token, which will prob drive the rate limit too high
//TODO: once database implemented, add token in database, set expiration date somehow? and then check if token exists in database
//TODO: OR if some route wants to use token, check using curr token, if it returns 404 (or whatever status code), then call /token again
//TODO: figure out refresh tokens; why use refresh tokens instead of just generating new token everytime?
router.get("/token", (req, res) => {
    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const spotifyConfig = {
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    axios.post("https://accounts.spotify.com/api/token", {
        grant_type: 'client_credentials'
    }, spotifyConfig)
    .then(response => {
        res.json(response.data)
    })
    .catch(err => {
      console.log("Error fetching Spotify token:", err)
    })
})

module.exports = router;
