import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Settings.css';

function Settings() {
  return (
    <div className='Settings'>
        <h1>Settings</h1>
        <Link id='link' to='/profile-review'><h4>user123</h4></Link>
        <form action='/log-in' method='post' enctype='multipart/form-data'>
        <div class="input-group">
          <label for="username">Change username: </label><br/>
          <input type="text" id="username" name="username" placeholder="Enter username" required/>
        </div>
        <br/>
        <div class="input-group">
          <label for="password">Change password: </label><br/>
          <input type="text" id="password" name="password" placeholder="Enter password" required/>
        </div>
        <br/>
        <div class="button">
          <input type="submit" value="Save"/>
        </div>
        <br/>
        <Link to='#'>Log Out</Link>

      </form>
      <br/>
    </div>
  );
}

export default Settings;