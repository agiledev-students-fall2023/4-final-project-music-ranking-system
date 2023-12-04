import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ProfileReview.css";
import { useParams, Link } from "react-router-dom";
import Nav from "./Nav";

function OtherUserProfile() {
  const [currentuser, setCurrentUser] = useState("");
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage

  const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        setResponse(res.data); // store the response data
        setCurrentUser(res.data.user.username);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { userId } = useParams();
  const [userData, setUser] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [followStatus, setFollowStatus] = useState();

  useEffect(() => {
    console.log("UserID: ", userId);
    axios
      .get(`http://localhost:3000/other-user/${userId}`)
      .then((res) => {
        console.log("Received data:", res.data);
        setUser(res.data);
        setUserActivity(res.data.activity);
      })
      .catch((error) => {
        console.error("Error fetching other user data: ", error);
      });
  }, [userId]);

  useEffect(() => {
    if (currentuser) {
      axios
        .get("http://localhost:3000/follow", {
          params: {
            userId: userId,
            currentuser: currentuser,
          },
        })
        .then((res) => {
          setFollowStatus(res.data.status);
          console.log("HERE");
          console.log(res.data.status);
        });
    }
  }, [currentuser]);

  const addFollowerToFollowers = async () => {
    // console.log("HERE1");
    try {
      axios
        .post("http://localhost:3000/follow", {
          userId: userId,
          currentuser: currentuser,
          status: followStatus,
        })
        .then((res) => {
          console.log(res.data.status);
          setFollowStatus(res.data.status);
        });
    } catch (err) {}
  };

  return (
    <>
      <div className="ProfileReview">
        <div className="profile">
          <h1>{userId}</h1>
        </div>

        <div className="FollowingDashboard">
          {/* <p>Followers: {userFollowers.length}</p>
          <p>Following: {userFollowing.length}</p> */}
          {isLoggedIn && (
            <button onClick={addFollowerToFollowers}>
              {followStatus ? <p>Unfollow</p> : <p>Follow</p>}
            </button>
          )}
        </div>

        <div className="activity">
          <h2>Activity</h2>
          {userActivity.map((entry, index) => (
            <div key={index} className="activity-entry">
              <p>
                <Link
                  to={`/post/${entry.song.artistName}/${entry.song.songName}/${userId}`}
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
  );
}

export default OtherUserProfile;
