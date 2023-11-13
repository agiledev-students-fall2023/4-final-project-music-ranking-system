import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "./AuthProvider.js";
import axios from 'axios';
import '../css/Settings.css';

function Settings() {
  const authContext = useAuthContext();
  const navigate = useNavigate();
  console.log(authContext.auth)

  const logout = e => {
    // e.preventDefault() // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    // maybe set property { withCredentials: true }?
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`)
      .then(response => {
        // prob want to redirect here once backend implemented?
        // https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-routers
        console.log("Logged out successfully")
      })
      .catch(err => {
        console.log("Error getting data:", err)
      })
    // for now, setting auth is false, removing local storage item auth and redirecting to / regardless of result of get request
    authContext.setAuth(false)
    authContext.setUser(null)
    localStorage.removeItem("auth")
    localStorage.removeItem("username")
    navigate("/")
  }
  
  return (
    <div className='Settings'>
        <h1>Settings</h1>
        <h4><Link id='link' to='/profile-review'>user123</Link></h4>
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