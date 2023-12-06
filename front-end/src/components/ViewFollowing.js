import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Following.css";
import Nav from "./Nav";

function ViewFollowing() {
  const [userId, setUserId] = useState("");
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [response, setResponse] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/protected`, {
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

  const [userFollowing, setFollowing] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/view-following/${userId}`)
      .then((response) => {
        setFollowing(response.data);
        console.log("following", userFollowing);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, [userId]);

  if (!userFollowing || userFollowing.length === 0) {
    return (
      <div className="profile">
        <h1>
          <Link to={`/profile`}>{userId}</Link>'s Following
        </h1>
        <div>You are not following anyone.</div>
        <Nav isLoggedIn={isLoggedIn} />
      </div>
    );
  } else {
    return (
      <div className="ViewFollowing">
        <div className="profile">
          <h1>
            <Link to={`/profile`}>{userId}</Link>'s Following:
          </h1>
        </div>

        <div className="following">
          {userFollowing.map((entry, index) => (
            <div key={index} className="following-entry">
              <p>
                <Link to={`/other-user/${entry.username}`}>
                  {entry.username}
                </Link>
              </p>
            </div>
          ))}
        </div>
        <Nav isLoggedIn={isLoggedIn} />
      </div>
    );
  }
}

export default ViewFollowing;
