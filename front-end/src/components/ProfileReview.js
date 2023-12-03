import React from "react";
import "../css/ProfileReview.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";



function App() {
  const [username, setUsername] = useState("");
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
        setUsername(res.data.user.username)
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [songObject, setSongObject] = useState([]);  
  const [activityObject, setActivityObject] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/myProfile/${username}`)
  //     .then((res) => {
  //       setSongObject(res.data.topSongs);
  //       setActivityObject(res.data.activity);

  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //     });
  // }, [username]);

  return (
    <>
      {isLoggedIn? (
        <div className="ProfileReview">
        <div className="ProfileReviewHeader">
          <h1>{username}</h1>
          <p><Link to="/settings">Settings</Link></p>
        </div>
        <div className="top-songs">
          <h2>Top Songs</h2>
          {/* <div className="ProfileReviewSongContainer">
            {songObject.map((song, index) => (
              <div key={index} className="song">
                <img src={song.albumCover} alt={song.songName} />
                <p><Link to={`/song/${song.artistName}/${song.songName}`} className="song-link">{song.artistName} -- {song.songName}</Link></p>
              </div>
            ))}
          </div> */}
        </div>
        <div className="activity">
          <h2>Activity</h2>
          {/* {activityObject.map((entry, index) => (
            <div key={index} className="activity-entry">
              <p><Link to={`/post/${entry.artistName}/${entry.songName}/${username}`}>{entry.artistName} -- {entry.songName}</Link></p>
              <p>{entry.rating}/10</p>
              <p>{entry.review}</p>
            </div>
          ))} */}
        </div>
      </div>
      ):(
        <Navigate to="/login?error=protected" />
      )}
    </>
  );
}

export default App;
