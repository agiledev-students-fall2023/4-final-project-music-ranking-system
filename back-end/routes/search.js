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

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Get access token (Client Credentials Flow)
const getAccessToken = async () => {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const data = new URLSearchParams({
    grant_type: "client_credentials",
  });

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
    }
  );
  return response.data.access_token;
};

router.get("/new", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const searchTerm = encodeURIComponent(req.query.query);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track,artist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const artists = response.data.artists.items;
    const tracks = response.data.tracks.items;

    res.json({ artists, tracks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
