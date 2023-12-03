import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/Nav.css";
import axios from 'axios';

function Nav(isLoggedIn) {
  console.log("isLoggedIn: ", isLoggedIn)
  return (
    <>
      {isLoggedIn? (
        <nav className="nav">
          <Link className="nav-link" to="/login">
            Log In
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </nav>
      ):(
        <nav className="nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/search">
            Search
          </Link>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </nav>
      )}
    </>
  );
}

export default Nav;
