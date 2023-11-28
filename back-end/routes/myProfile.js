const express = require("express");
const axios = require("axios");
const router = express.Router();

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

