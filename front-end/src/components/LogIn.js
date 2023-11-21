import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/LogIn.css";
import { useAuthContext } from "./AuthProvider.js";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault(); // prevent normal browser submit behavior

    // send data to server... getting server host name from .env environment variables file to make it easy to swap server hosts in one place
    axios
      .post(`http://localhost:3000/login/`, {
        username: username,
        password: password,
      })
      .then((response) => {
        authContext.setAuth(true);
        authContext.setUser(username);
        localStorage.setItem("auth", true);
        localStorage.setItem("username", username);
        setError(null); // Clear any previous error
        setUsername("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        setError("Invalid username or password. Please try again.");
      });

    // for now, setting auth is true, setting local storage item auth to true,  and redirecting to / regardless of result of post request
    // authContext.setAuth(true);
    // authContext.setUser(username);
    // localStorage.setItem("auth", true);
    // localStorage.setItem("username", username);
    // // clear form
    // setUsername("");
    // setPassword("");
    // navigate("/");
  };

  return (
    <div className="LogIn">
      <h2> Log In</h2>
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
      {error && <p className="error-message">{error}</p>}
      <br />
      <Link to="/signup">Need an account? Click here to sign up</Link>
    </div>
  );
}

export default LogIn;
