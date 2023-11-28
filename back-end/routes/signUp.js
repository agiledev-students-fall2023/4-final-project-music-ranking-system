// routes/users.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
