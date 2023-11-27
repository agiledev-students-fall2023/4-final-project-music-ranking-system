const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();



mongoose.connect("mongodb://localhost:27017/your_database_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
});

const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Song = mongoose.model("Song", songSchema);
const Activity = mongoose.model("Activity", activitySchema);

router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find().limit(4);
    res.json(songs);
  } catch (error) {
    console.error("Error fetching song data: ", error);
    res.status(500).json({ error: "Failed to fetch song data" });
  }
});

router.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find().limit(3);
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activity data: ", error);
    res.status(500).json({ error: "Failed to fetch activity data" });
  }
});

module.exports = router;


/*
router.get("/songs", (req, res) => {
  const response = axios
   .get("https://api.mockaroo.com/api/4f9a5d40?count=4&key=deb8cfd0")
    .then((apiResponse) => {
      const resdata = apiResponse.data;
      res.json(resdata);
    })
    .catch((error) => {
      console.error("Error fetching song data: ", error);
      res.status(500).json({ error: "Failed to fetch song data" });
    });
});

router.get("/activities", (req, res) => {
  const response = axios
    .get("https://api.mockaroo.com/api/9360e250?count=3&key=deb8cfd0")
    .then((apiResponse) => {
      const resdata = apiResponse.data;
      res.json(resdata);
    })
    .catch((error) => {
      console.error("Error fetching activity data: ", error);
      res.status(500).json({ error: "Failed to fetch activity data" });
    });
});

module.exports = router;

*/
