// import and instantiate express
const express = require("express"); // CommonJS import style!
const router1 = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.js');
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router1.post("/other-user/:userId/:currentuser/save", async (req, res) => {
  const user_to_find = req.params.userId;
  const currentusername = req.params.currentuser;

  try {
    const user = await User.findOne({ username: user_to_find });
    const current = await User.findOne({ username: currentusername });
    user.followers.push(current);
    current.following.push(user);
    await user.save();
    await current.save();
    const followData = { user, current };
    res.json(followData);
  } catch (err) {
    res.status(500).json({ "Error following": err });
  }
})

// OtherUserProfile.js requests
router1.get("/other-user/:userId", async (req, res) => {
  const user_to_find = req.params.userId;

  User.findOne({ username: user_to_find })
    .then((user) => {
      if (user) {
        // Display the user information
        res.json(user);
      } else {
        res.send('User not found');
      }
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).send('Internal Server Error');
    });
  });
  
  module.exports = router1;