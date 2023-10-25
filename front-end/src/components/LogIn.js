import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LogIn.css';

function LogIn() {
  return(
    <div className='LogIn'>
      <h2> Log In</h2>  
      <form action='/log-in' method='post' enctype='multipart/form-data'>
        <div class="input-group">
          <label for="username">Username: </label><br/>
          <input type="text" id="username" name="username" placeholder="Enter username" required/>
        </div>
        <br/>
        <div class="input-group">
          <label for="password">Password: </label><br/>
          <input type="text" id="password" name="password" placeholder="Enter password" required/>
        </div>
        <br/>
        <div class="button">
          <input type="submit" value="Enter"/>
        </div>

      </form>
      <br/>
      <Link to="/signup">Need an account? Click here to sign up</Link>
    </div>
  )
}

export default LogIn;