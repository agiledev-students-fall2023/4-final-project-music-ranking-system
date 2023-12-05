import React from "react";
import "../css/ProfileReview.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./Nav";

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

  const [activityObject, setActivityObject] = useState([]);
  let [userFollowers, setFollowers] = useState([]);
  let [userFollowing, setFollowing] = useState([]);
  const addFollowerToFollowers = follower => {
    const newFollowers = [follower, ...userFollowers]
    setFollowers(newFollowers)
  }
  const addFollowerToFollowing = follower => {
    const newFollowing = [follower, ...userFollowing]
    setFollowing(newFollowing)
  }
  let [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/myProfile/${username}`)
      .then((res) => {
        setActivityObject(res.data.activity);
        setFollowers([...res.data.followers]);
        setFollowing([...res.data.following]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [username]);

  return (
    <>
      {isLoggedIn? (
        <>
          <div className="ProfileReview">
            <div className="ProfileReviewHeader">
              <h1>{username}</h1>
              <p>
                <Link to="/settings" id="settings">Settings</Link>
              </p>
            </div>
            <div className="FollowingDashboard">
              <p>Followers: {userFollowers.length}</p>
              <p>Following: {userFollowing.length}</p>
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
          <Nav isLoggedIn={isLoggedIn} />
        </>
      ):(
        <Navigate to="/login?error=protected" />
      )}
    </>
  );
}

export default App;
