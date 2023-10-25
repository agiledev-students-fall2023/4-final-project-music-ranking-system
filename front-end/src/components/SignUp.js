import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css';

function SignUp() {
  return (
    <div className="signUp">
      <h2>Sign Up</h2>  
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
      <Link to="/login">Already have an account? Click here to log in</Link>
    </div>
  );
}

export default SignUp;