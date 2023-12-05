// import and instantiate express
const express = require("express"); // CommonJS import style!
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// user requests
router.get("/view-followers/:userId", async (req, res) => {
    const user_to_find = req.params.userId;

    User.findOne({ username: user_to_find })
      .then(async (user) => {
        if (user) {
          // Display the user information
          //console.log("usernames", user.followers);
          const followersData = await Promise.all(
            user.followers.map(async (follower) => {
              const userData = await User.findById(follower._id);
              return {
                username: userData.username,
              };
            })
          )
          //console.log("followersData", followersData);
          res.json(followersData);
        } else {
          res.send("User not found");
        }
      })
      .catch((error) => {
        console.error("Error finding user:", error);
        res.status(500).send("Internal Server Error");
      });
  });



module.exports = router;
