const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/user.js");
const Song = require("../models/song.js");

router.get("/:username", async (req, res) => {
  try {
    const user_to_find = req.params.username;
    User.findOne({ username: user_to_find })
      .then((user) => {
        if (user) {
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

    const alreadyExists = await User.findOne({ username: usernameChange });
    if (alreadyExists != null) {
      return res.status(409).json({
        msg: "This username already exists",
      });
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        newUser: usernameChange,
        msg: "User not found",
      });
    }

    const result = await User.updateMany(
      { username: username },
      { $set: { "activity.$[].username": usernameChange } }
    );
    const updatePromise = await Song.updateMany(
      { "posts.username": username },
      { $set: { "posts.$[elem].username": usernameChange } },
      { arrayFilters: [{ "elem.username": username }] }
    );

    user.username = usernameChange;
    user.password = passwordChange;

    await user.save();

    return res.status(201).json({
      newUser: usernameChange,
      msg: "Account Updated!",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
