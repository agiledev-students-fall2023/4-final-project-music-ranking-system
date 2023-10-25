import React from 'react';
import '../App.css';


function App() {
  const topSongs = [
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
  ];

  const userActivity = [
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
  ];

  return (
    <div className="profile-review">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="profile">
        <h1>User123</h1>
      </div>
      <div className="top-songs">
        <h2>Top Songs</h2>
        <div className="song-container">
          {topSongs.map((song, index) => (
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
              Review for: <a href="#">{entry.songName}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  /*
  return (
    <div className="profile-review">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="profile">
        <h1>User's Profile</h1>
      </div>
      <div className="top-songs">
        <h2>Top Songs</h2>
        {topSongs.map((song, index) => (
          <div key={index} className="song">
            <img src={song.albumCover} alt={song.songName} />
            <p>{song.songName} - {song.artistName}</p>
          </div>
        ))}
      </div>
      <div className="activity">
        <h2>Activity</h2>
        {userActivity.map((entry, index) => (
          <div key={index} className="activity-entry">
            <p>{entry.review}</p>
            <p>Rating: {entry.rating}/10</p>
            <p>Review for: <a href="#">{entry.songName}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
  */
}

export default App;
