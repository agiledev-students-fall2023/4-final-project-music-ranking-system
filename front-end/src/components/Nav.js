import React from "react";
import "../css/Nav.css";

function Nav() {
  return (
    <div>
      <div className="title">
        <a href="/">
          <img
            id="logo"
            src={process.env.PUBLIC_URL + "/notes.png"}
            alt="music notes"
          />
        </a>
        <div className="nav">
          <a href="/">Home</a>
          <a href="/search">Search</a>
          <a href="/profile-review">Profile</a>
          <a href="/about">About</a>
        </div>
        <h1>Music Ranking System</h1>
      </div>
    </div>
  );
}

export default Nav;
