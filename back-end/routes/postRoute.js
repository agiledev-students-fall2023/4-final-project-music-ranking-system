// import and instantiate express
const express = require("express"); // CommonJS import style!
const axios = require("axios"); // middleware for making requests to APIs
const router2 = express.Router();

// Post.js requests to/from API
router2.get("/post/:postId", async (req, res) => {
    const postID = parseInt(req.params.postId);
    //res.send({ postId: postID });
    try {
      const apiResponse = await axios.get(
        "https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0"
      );
      const resdata = apiResponse.data;
      //res.send(resdata);
      const foundData = resdata.find((item) => item.id === postID);
      //res.send(foundData);
      if (foundData) {
        res.json(foundData);
      } else {
        res.status(404).json({ error: "Error data" });
      }
    } catch (error) {
      //console.error("Error fetching data from API:", error);
      res.status(500).json({ error: "Internal Server Error:" });
    }
  });

module.exports = router2;