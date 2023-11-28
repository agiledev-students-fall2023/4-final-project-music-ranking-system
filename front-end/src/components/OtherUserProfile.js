import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/ProfileReview.css';
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
    <div className="ProfileReview">
      <div className="profile">
        <h1>{userId}</h1>
      </div>

      <div className="top-songs">
        <h2>Top Songs</h2>
        <div className="ProfileReviewSongContainer">
          {userSongs.map((song, index) => (
            <div key={index} className="song">
              <img src={song.albumCover} alt={song.songName} />
              <p><Link to={`/song/${song.artistName}/${song.songName}`} className="song-link">{song.artistName} -- {song.songName}</Link></p>
            </div>
          ))}
        </div>
      </div>

       <div className="activity">
        <h2>Activity</h2>
        {userActivity.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p><Link to={`/post/${entry.artistName}/${entry.songName}/${userId}`}>{entry.artistName} -- {entry.songName}</Link></p>
            <p>{entry.rating}/10</p>
            <p>{entry.review}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default OtherUserProfile;