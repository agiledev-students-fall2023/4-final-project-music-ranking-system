import React from "react";
import "../css/ProfileReview.css";
import { useAuthContext } from "./AuthProvider.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const username = useAuthContext().user;
  const [songObject, setSongObject] = useState([]);
  const [activityObject, setActivityObject] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/myProfile/${username}`)
      .then((res) => {
        setSongObject(res.data.topSongs);
        setActivityObject(res.data.activity);
        console.log(activityObject);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [username]);

  return (
    <div className="ProfileReview">
      <div className="ProfileReviewHeader">
        <h1>{username}</h1>
        <p>
          <Link to="/settings">Settings</Link>
        </p>
      </div>
      <div className="top-songs">
        <h2>Top Songs</h2>
        <div className="ProfileReviewSongContainer">
          {songObject.map((song, index) => (
            <div key={index} className="song">
              <img src={song.albumCover} alt={song.songName} />
              <p>
                <Link
                  to={`/song/${song.artistName}/${song.songName}`}
                  className="song-link"
                >
                  {song.artistName} -- {song.songName}
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="activity">
        <h2>Activity</h2>
        {activityObject.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p>
              <Link
                to={`/post/${entry.song.artistName}/${entry.song.songName}/${username}`}
              >
                {entry.song.artistName} -- {entry.song.songName}
              </Link>
            </p>
            <p>{entry.rating}/10</p>
            <p>{entry.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
