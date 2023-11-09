import React from "react";
import "../css/ProfileReview.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [songObject, setSongObject] = useState([]);
  const [activityObject, setActivityObject] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/myProfile/songs")
      .then((res) => {
        console.log(res.data);
        setSongObject(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/myProfile/activities")
      .then((res) => {
        setActivityObject(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="profile-review">
      <div className="profile">
        <h1>User123</h1>
      </div>
      <Link to="/settings">Settings</Link>
      <div className="top-songs">
        <h2>Top Songs</h2>
        <div className="song-container">
          {songObject.map((song, index) => (
            <div key={index} className="song">
              <img src={song.albumCover} alt={song.songName} />
              <p>
                <Link
                  to={`/song/${song.artistName}/${song.songName}`}
                  className="song-link"
                >
                  {song.songName}
                </Link>
                {" - " + song.artistName}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="activity">
        <h2>Activity</h2>
        {activityObject.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p>{entry.review}</p>
            <p>Rating: {entry.rating}/10</p>
            <p>
              Review for:{" "}
              <Link
                className="song-link"
                to={`/song/${entry.artistName}/${entry.songName}`}
              >
                {entry.songName}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
