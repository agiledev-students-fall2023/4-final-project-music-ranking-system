// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const mongoose = require("mongoose");
const connect_db = require("./db");
require("dotenv").config();
const cors = require("cors") // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const path = require("path")
const cookieParser = require("cookie-parser") // middleware useful for parsing cookies in requests
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env //needed????

// the following are used for authentication with JSON Web Tokens
const jwt = require("jsonwebtoken")
const passport = require("passport")

// use this JWT strategy within passport for authentication handling
const jwtStrategy = require("./config/jwt-config.js") // import setup options for using JWT in passport
passport.use(jwtStrategy)

// tell express to use passport middleware
app.use(passport.initialize())

// mongoose models for MongoDB data manipulation
const User = require("./models/User.js")

// connect to the database
// console.log(`Conneting to MongoDB at ${process.env.MONGODB_URI}`)
try {
  mongoose.connect(process.env.MONGODB_URI)
  console.log(`Connected to MongoDB.`)
} catch (err) {
  console.log(
    `Error connecting to MongoDB user account authentication will fail: ${err}`
  )
}

// set up some useful middleware
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cookieParser()) // useful middleware for dealing with cookies

// the following cors setup is important when working with cookies on your local machine
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true })) // allow incoming requests only from a "trusted" host

// to keep this file neat, we put the logic for the various routes into specialized routing files
const authenticationRoutes = require("./routes/authentication-routes.js")
const cookieRoutes = require("./routes/cookie-routes.js")
const protectedContentRoutes = require("./routes/protected-content-routes.js")

// use the specialized routing files
app.use("/auth", authenticationRoutes()) // all requests for /auth/* will be handled by the authenticationRoutes router
app.use("/cookie", cookieRoutes()) // all requests for /cookie/* will be handled by the cookieRoutes router
app.use("/protected", protectedContentRoutes()) // all requests for /protected/* will be handled by the protectedRoutes router


connect_db();

const homePage = require("./routes/homePage");
const songRoute = require("./routes/song");
const otherUserRoute = require("./routes/otherUser");
const postRoute = require("./routes/postRoute");
const searchRoute = require("./routes/search");
const myProfile = require("./routes/myProfile");
const landingFeedRoute = require("./routes/landingFeed");
const spotifyRoute = require("./routes/spotify");
const signupRoute = require("./routes/signUp");
const loginRoute = require("./routes/register");

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
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

// export the express app we created to make it available to other modules
module.exports = app;
