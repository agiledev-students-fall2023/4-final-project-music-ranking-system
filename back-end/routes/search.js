// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();

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

router.get("/song", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const searchTerm = encodeURIComponent(req.query.query);

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // const artists = response.data.artists.items;
    const tracks = response.data.tracks.items;

    res.json({ tracks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Assuming you have a valid implementation for getAccessToken
router.get("/artist", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const searchTerm = encodeURIComponent(req.query.query);
    console.log(accessToken);
    const response = await axios.get(
      `https://api.spotify.com/v1/search?type=track&q=artist:${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const tracks = response.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      album: track.album.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      image: track.album.images.length > 0 ? track.album.images[0].url : null,
    }));

    res.json({ tracks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
