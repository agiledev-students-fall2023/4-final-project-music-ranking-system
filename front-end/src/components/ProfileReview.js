import React from 'react';
import '../css/ProfileReview.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from "react";



function App() {
  
  const [songObject, setSongObject] = useState([]);   
  const [activityObject, setActivityObject] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.mockaroo.com/api/4f9a5d40?count=4&key=deb8cfd0")
      .then((res) => {
        setSongObject(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);


  useEffect(() => {
    axios
      .get("https://api.mockaroo.com/api/9360e250?count=3&key=deb8cfd0")  
      .then((res) => {
        setActivityObject(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); 


  return (
    <div className="ProfileReview">
      <div className="ProfileReviewHeader">
        <h1>User123</h1>
        <p><Link to="/settings">Settings</Link></p>
      </div>
      <div className="top-songs">
        <h2>Top Songs</h2>
        <div className="ProfileReviewSongContainer">
          {songObject.map((song, index) => (
            <div key={index} className="song">
              <img src={song.albumCover} alt={song.songName} />
              <p><Link to={`/song/${song.artistName}/${song.songName}`} className="song-link">{song.artistName} -- {song.songName}</Link></p>
            </div>
          ))}
        </div>
      </div>
      <div className="activity">
        <h2>Activity</h2>
        {activityObject.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p><Link to={`/post/${entry.songName}`}>{entry.artistName} -- {entry.songName}</Link></p>
            <p>{entry.rating}/10</p>
            <p>{entry.review}</p>
          </div>
        ))}
      </div>
    </div>
  );

 
}

export default App;
