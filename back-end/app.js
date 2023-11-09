// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const morgan = require("morgan"); // middleware for printing requests on terminal
const homePage = require("./routes/homePage");
const song = require("./routes/song");
const otherUserRoute = require("./routes/otherUser");
const postRoute = require("./routes/postRoute");
const searchRoute = require("./routes/search");
const landingFeedRoute = require("./routes/landingFeed");

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

app.use(morgan("dev"));
// we will put some server logic here later...
app.use("/static", express.static("public"));

app.use("/", homePage);
app.use("/song", song);
app.use("/", otherUserRoute);
app.use("/", postRoute);
app.use("/search", searchRoute);
app.use("/landingFeed", landingFeedRoute);

// export the express app we created to make it available to other modules
module.exports = app;
