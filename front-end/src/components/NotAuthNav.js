import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/Nav.css";

function NotAuthNav() {
  return (
    <div>
      <nav className="nav">
        <Link className="nav-link" to="/login">
          Log In
        </Link>
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </nav>
    </div>
  );
}

export default NotAuthNav;
