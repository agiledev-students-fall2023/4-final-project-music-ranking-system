// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();
const User = require("../models/User.js");

router.post("/", (req, res) => {
  username = req.body.username;
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        const following = user.following;
        User.find({ _id: { $in: following } }, "activity")
          .then((users) => {
            const activities = users.map((userP) => userP.activity).flat();
            console.log("here");
            console.log(users);
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
