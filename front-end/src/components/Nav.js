import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/Nav.css";

function Nav({isLoggedIn}) {
  return (
    <>
      {isLoggedIn? (
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
      ):(
        <nav className="nav">
          <Link className="nav-link" to="/login">
            Log In
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </nav>
      )}
    </>
  );
}

export default Nav;
