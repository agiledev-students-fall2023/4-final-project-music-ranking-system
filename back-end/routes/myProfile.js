const express = require('express');
const axios = require('axios');
const router3 = express.Router();


router3.get('/api/songs', async (req, res) => {
  try {
    const response = await axios.get("https://api.mockaroo.com/api/4f9a5d40?count=4&key=deb8cfd0");
    res.json(response.data);
  } 
  catch (error) {
    console.error("Error fetching song data: ", error);
    res.status(500).json({ error: "Failed to fetch song data" });
  }
});

 router3.get('/api/activities', async (req, res) => {
  try {
    const response = await axios.get("https://api.mockaroo.com/api/9360e250?count=3&key=deb8cfd0");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching activity data: ", error);
    res.status(500).json({ error: "Failed to fetch activity data" });
  }
});


module.exports = router3;