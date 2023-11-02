import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/Nav.css";

function Nav() {
  return (
    <div>
      <nav className="nav">
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
      </nav>
    </div>
  );
}

export default Nav;
