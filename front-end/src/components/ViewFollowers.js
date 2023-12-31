import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Followers.css";
import Nav from "./Nav";

function ViewFollowers() {
  const [userId, setUserId] = useState("");
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [response, setResponse] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then((res) => {
        setResponse(res.data);
        setUserId(res.data.user.username);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false);
      });
  }, []);

  const [userFollowers, setFollowers] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/view-followers/${userId}`)
      .then((response) => {
        setFollowers(response.data);
        console.log("followers", response.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, [userId]);

  useEffect(() => {
    console.log("set followers", userFollowers);
  }, [userFollowers]);

  if (!userFollowers || userFollowers.length === 0) {
    return (
      <div className="profile">
        <h1>
          <Link to={`/profile`}>{userId}</Link>'s Followers
        </h1>
        <div>You have no followers.</div>
        <Nav isLoggedIn={isLoggedIn} />
      </div>
    );
  }
  return (
    <div className="ViewFollowers">
      <div className="profile">
        <h1>
          <Link to={`/profile`}>{userId}</Link>'s Followers
        </h1>
      </div>

      <div className="followers">
        {userFollowers.map((entry, index) => (
          <div key={index} className="follower-entry">
            <p>
              <Link to={`/other-user/${entry.username}`}>{entry.username}</Link>
              <br />
            </p>
          </div>
        ))}
      </div>
      <Nav isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default ViewFollowers;
