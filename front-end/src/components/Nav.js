import React from 'react';

function Nav() {
    return (
      <div className="Nav">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/profile-review">Profile</a></li>
            <li><a href="/about">About</a></li>
        </ul>
      </div>
    );
  }
  
  export default Nav;