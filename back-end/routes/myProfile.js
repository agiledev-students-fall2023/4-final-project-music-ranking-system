const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/User.js");

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

module.exports = router;
