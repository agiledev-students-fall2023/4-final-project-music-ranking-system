import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useParams, Link } from "react-router-dom";


function OtherUserProfile() {
  const { userId } = useParams();
  const [userData, setUser] = useState([]);
  const [userSongs, setSongs] = useState([]);
  const [userActivity, setActivity] = useState([]);

  useEffect(() => {
    console.log("UserID: ", userId);
    axios
      .get(`http://localhost:3000/other-user/${userId}`)
      .then((res) => {
        console.log('Received data:', res.data);
        setUser(res.data);
        setSongs(res.data.topSongs);
        setActivity(res.data.activity);
      })
      .catch((error) =>{
        console.error("Error fetching other user data: ", error);
      });
      
  }, [userId]);

  if (!userData && !userSongs && !userActivity) {
    return <div>Loading...</div>
  }
  return (
    <div className="profile-review">
      <div className="profile">
        <h1>{userId}</h1>
      </div>

      <div className="top-songs">
        <h2>Top Songs</h2>
        <div className="song-container">
          {userSongs.map((song, index) => (
            <div key={index} className="song">
              <img src={song.albumCover} alt={song.songName} />
              <p>{song.songName} - {song.artistName}</p>
            </div>
          ))}
        </div>
      </div>

       <div className="activity">
        <h2>Activity</h2>
        {userActivity.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p>{entry.review}</p>
            <p>Rating: {entry.rating}/10</p>
            <p>
              Review for: <Link className="song-link" to="/song">{entry.songName}</Link>
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default OtherUserProfile;