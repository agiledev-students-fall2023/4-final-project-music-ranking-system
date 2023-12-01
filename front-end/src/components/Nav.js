import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../css/Nav.css";

function Nav() {
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`) // debugging

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
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div>
      <nav className="nav">
      {isLoggedIn? (
        <>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/search">
            Search
          </Link>
          <Link className="nav-link" to="/profile-review">
            Profile
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
          </>
      ):(
        <>
          <Link className="nav-link" to="/login">
            Log In
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </>
      )}
      </nav>
    </div>
  );
}

export default Nav;
