import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "./AuthProvider.js";
import axios from 'axios';
import '../css/Settings.css';

function Settings() {
  const authContext = useAuthContext();
  const user = useAuthContext().user;
  const navigate = useNavigate();
  console.log(authContext.auth)

  const logout = e => {
    localStorage.removeItem("token")
    navigate("/")
  }
  
  return (
    <div className='Settings'>
        <h1>Settings</h1>
        <h4><Link id='link' to='/profile-review'>{user}</Link></h4>
        <form enctype='multipart/form-data'>
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
        <button type='button' onClick={(e) => logout(e)}>Logout</button>
      </form>
      <br/>
    </div>
  );
}

export default Settings;