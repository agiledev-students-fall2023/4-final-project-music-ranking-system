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

 
 
 /* const topSongs = [
    // {
    //   songName: 'Born To Die',
    //   artistName: 'Lana Del Rey',
    //   albumCover: 'https://picsum.photos/200',
    // },
    // {
    //   songName: 'Candy',
    //   artistName: 'Doja Cat',
    //   albumCover: 'https://picsum.photos/200',
    // },
    // {
    //   songName: 'Heartless',
    //   artistName: 'The Weeknd',
    //   albumCover: 'https://picsum.photos/200',
    // }
  ]; */

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
                <Link to={`/song/${song.artistName}/${song.songName}`} className="song-link">{song.songName}</Link>
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
              Review for: <Link className="song-link" to={`/song/${entry.artistName}/${entry.songName}`}>{entry.songName}</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );

 
}

export default App;
