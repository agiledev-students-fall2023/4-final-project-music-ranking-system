import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LogIn.css';
import { useAuthContext } from "./AuthProvider.js";



function LogIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const submitForm = e => {
    e.preventDefault() // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/login`, {
        username: username,
        password: password,
      })
      .then(response => {
        // prob want to redirect here once backend implemented?
        // https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-routers
        console.log("Logged in successfully")
      })
      .catch(err => {
        console.log("Error posting data:", err)
      })

    // clear form
    setUsername('')
    setPassword('')
    // for now, setting auth is true, setting local storage item auth to true,  and redirecting to / regardless of result of post request
    authContext.setAuth(true)
    localStorage.setItem("auth", true)
    navigate("/")
  }

  return(
    <div className='LogIn'>
      <h2> Log In</h2>  
      <form enctype='multipart/form-data' onSubmit={submitForm}>
        <div class="input-group">
          <label for="username">Username: </label><br/>
          <input type="text" id="username" name="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required/>
        </div>
        <br/>
        <div class="input-group">
          <label for="password">Password: </label><br/>
          <input type="text" id="password" name="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required/>
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