const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/user.js");

router.get("/:username", async (req, res) => {
  try {
    const user_to_find = req.params.username;
    User.findOne({ username: user_to_find })
      .then((user) => {
        if (user) {
          console.log(user);
          res.json(user);
        } else {
          res.send("User not found");
        }
      })
      .catch((error) => {
        console.error("Error finding user:", error);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.error("Error fetching song data: ", error);
    res.status(500).json({ error: "Failed to fetch song data" });
  }
});
router.post("/save", async (req, res) => {
  try {
    const username = req.body.username;
    const usernameChange = req.body.usernameChange;
    const passwordChange = req.body.passwordChange;

    const user = await User.findOne({ username: username });

    if (user) {
      user.username = usernameChange;
      user.password = passwordChange;

      await user.save();

      res.json({ newUser: usernameChange });
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
});

module.exports = router;
