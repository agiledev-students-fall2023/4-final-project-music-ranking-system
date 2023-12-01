// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const mongoose = require("mongoose");
const connect_db = require("./db");
require("dotenv").config();
connect_db();
const homePage = require("./routes/homePage");
const songRoute = require("./routes/song");
const otherUserRoute = require("./routes/otherUser");
const postRoute = require("./routes/postRoute");
const searchRoute = require("./routes/search");
const myProfile = require("./routes/myProfile");
const landingFeedRoute = require("./routes/landingFeed");
const spotifyRoute = require("./routes/spotify");
const authenticationRoute = require("./routes/authentication");
const protectedRoute = require("./routes/protected-content")

// the following are used for authentication with JSON Web Tokens
const jwt = require("jsonwebtoken")
const passport = require("passport")

// use this JWT strategy within passport for authentication handling
const jwtStrategy = require("./config/jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// tell express to use passport middleware
app.use(passport.initialize())

// use express' builtin body-parser middleware to parse data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/static", express.static("public"));

app.use("/", homePage);
app.use("/song", songRoute);
app.use("/", otherUserRoute);
app.use("/post", postRoute);
app.use("/myProfile", myProfile);
app.use("/search", searchRoute);
app.use("/landingFeed", landingFeedRoute);
app.use("/spotify", spotifyRoute);
app.use("/auth", authenticationRoute);
app.use("/protected", protectedRoute)

// export the express app we created to make it available to other modules
module.exports = app;
