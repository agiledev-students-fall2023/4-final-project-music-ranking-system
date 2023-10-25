import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="Nav">
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search">Search</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile-review">Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
  }
  
export default Nav;
