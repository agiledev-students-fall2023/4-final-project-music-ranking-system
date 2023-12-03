import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../css/SignUp.css";
import Nav from "./Nav";


const SignUp = props => {
  // create state variables to hold username and password
  const [response, setResponse] = useState({}); // the API will return an object with a JWT token, if the user logs in successfully
  const [errorMessage, setErrorMessage] = useState("");

  // if the user's logged-in status changes, save the token we receive from the server
  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (response.success && response.token) {
      console.log(`User successfully logged in: ${response.username}`);
      localStorage.setItem("token", response.token); // store the token into localStorage
    }
  }, [response]);

  // what to do when the user clicks the submit buton on the form
  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      };
      // send a POST request with the data to the server api to authenticate
      const response = await axios.post(
        `http://localhost:3000/auth/signup`,
        requestData
      );
      // store the response data into s the data state variable
      console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`);
      setResponse(response.data);
    } catch (err) {
      // request failed... user entered invalid credentials
      setErrorMessage(
        "The username or password you entered are not valid."
      );
    }
  };

  // if the user is not logged in, show the signup form
  if (!response.success)
    return (
      <>
        <div className="SignUp">
          <h2>Sign Up</h2>
          <form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <div class="input-group">
              <label for="username">Username: </label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                required
              />
            </div>
            <br />
            <div class="input-group">
              <label for="password">Password: </label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <br />
            <div class="button">
              <input type="submit" value="Enter" />
            </div>
          </form>
          {errorMessage ? <p className="error">{errorMessage}</p> : ""}
          <br />
          <Link to="/login">Already have an account? Click here to log in</Link>
        </div>
        <Nav isLoggedIn={false} />
      </>
    );
  // otherwise, if the user has successfully logged-in, redirect them to a different page
  // in this example, we simply redirect to the home page, but a real app would redirect to a page that shows content only available to logged-in users
  else return <Navigate to="/" />;
};

export default SignUp;
