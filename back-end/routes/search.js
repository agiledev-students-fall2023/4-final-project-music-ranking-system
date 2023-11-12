// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();

router.get("/", (req, res) => {
  axios
    .get("https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0")
    .then((apiResponse) => {
      const resdata = apiResponse.data;
      res.json(resdata);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
