const express = require("express");
const axios = require("axios");
const router = express.Router();

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
