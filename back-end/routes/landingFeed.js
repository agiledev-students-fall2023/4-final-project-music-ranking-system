// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const landingFeedSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  cover: {
    type: String, // img url?
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
const model = mongoose.model("Data", landingFeedSchema);

router.get("/retrieve", async (req, res) => {
  // axios
  //   .get("https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0")
  //   .then((apiResponse) => {
  //     const resdata = apiResponse.data;
  //     res.json(resdata);
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   });

  try {
    const data = await model.find({}).exec();
    if (data.length === 0) {
      const response = await axios.get(
        "https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0"
      );
      const responseData = response.data;
      await model.insertMany(responseData);
      res.json(resdata);
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
