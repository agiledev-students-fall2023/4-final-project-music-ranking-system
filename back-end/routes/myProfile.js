const express = require("express");
const axios = require("axios");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const songSchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
  },
  songName: {
    type: String,
    required: true,
  },
  albumCover: {
    type: String,  
    required: true,
  }
});

const activitySchema = new mongoose.Schema({
  artistName: {
    type: String,
    required: true,
  },
  songName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const songModel = mongoose.models.Song || mongoose.model("Song", songSchema);
const activityModel = mongoose.models.Activity || mongoose.model("Activity", activitySchema);

router.get("/songs", async (req, res) => {
  try 
  {
    const songs = await songModel.find().limit(4);
    res.json(songs);
  } 
  catch (error) 
  {
    console.error("Error fetching song data: ", error);
    res.status(500).json({ error: "Failed to fetch song data" });
  }
});


router.get("/activities", async (req, res) => {
  try 
  {
    const activities = await activityModel.find().limit(3);
    res.json(activities);
  } 
  catch (error) 
  {
    console.error("Error fetching activity data: ", error);
    res.status(500).json({ error: "Failed to fetch activity data" });
  }
});


module.exports = router;

