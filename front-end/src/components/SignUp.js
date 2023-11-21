import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider.js";
import axios from "axios";
import "../css/SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault(); // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`http://localhost:3000/signup/`, {
        username: username,
        password: password,
      })
      .then((response) => {
        // prob want to redirect here once backend implemented?
        // https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-routers
        console.log("Signed up successfully");
      })
      .catch((err) => {
        console.log("Error posting data:", err);
      });

    // for now, setting auth is true, setting local storage item auth is true and redirecting to / regardless of result of post request
    authContext.setAuth(true);
    authContext.setUser(username);
    localStorage.setItem("auth", true);
    localStorage.setItem("username", username);

    // clear form
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <form enctype="multipart/form-data" onSubmit={submitForm}>
        <div class="input-group">
          <label for="username">Username: </label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div class="input-group">
          <label for="password">Password: </label>
          <br />
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div class="button">
          <input type="submit" value="Enter" />
        </div>
      </form>
      <br />
      <Link to="/login">Already have an account? Click here to log in</Link>
    </div>
  );
}

export default SignUp;
