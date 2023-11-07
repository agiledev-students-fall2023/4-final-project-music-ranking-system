// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs

// use express' builtin body-parser middleware to parse data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// we will put some server logic here later...
app.use("/static", express.static("public"));


// Post.js requests to/from API
app.get("/post/:postId", async (req, res) => {
    const postID = parseInt(req.params.postId);
    //res.send({ postId: postID });
    try {
        const apiResponse = await axios.get("https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0");
        const resdata = apiResponse.data;
        //res.send(resdata);
        const foundData = resdata.find(item => item.id === postID);
        //res.send(foundData);
        if (foundData){
            res.json(foundData);
        } else {
            res.status(404).json({ error: "Error data"});
        }
    }
    catch (error) {
        //console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Internal Server Error:" });
    }
});

// OtherUserProfile.js requests 
app.get("/other-user/:userId", async(req, res) => {
    const userID = req.params.userId;
    const data = {
        userId: userID,
        topSongs: [
            {
              songName: 'Born To Die',
              artistName: 'Lana Del Rey',
              albumCover: 'https://picsum.photos/200',
            },
            {
              songName: 'Candy',
              artistName: 'Doja Cat',
              albumCover: 'https://picsum.photos/200',
            },
            {
              songName: 'Heartless',
              artistName: 'The Weeknd',
              albumCover: 'https://picsum.photos/200',
            },
            {
              songName: 'Popular (with Playboi Carti & Madonna)',
              artistName: 'The Weeknd, Playboi Carti, Madonna',
              albumCover: 'https://picsum.photos/200',
            },
          ],
        
        activity: [
            {
              review: 'Love this song! My favorite! Pretend I came up with some more positive comments!',
              rating: 9,
              songName: 'Song 1',
            },
            {
              review: 'This song sucks. Overrated. Cannot open Tiktok wo hearing it this is so overplayed.',
              rating: 2,
              songName: 'Song 2',
            },
            {
              review: 'This song is good, but no where near as much as everyone is saying. Mid.',
              rating: 6,
              songName: 'Song 3',
            },
        ],
    };

    res.send(data);
})

// export the express app we created to make it available to other modules
module.exports = app;
