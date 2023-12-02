import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthProvider.js";
import "../css/Nav.css";

function Nav() {
  const authContext = useAuthContext();
  const isLoggedIn = authContext.isLoggedIn;
  
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
