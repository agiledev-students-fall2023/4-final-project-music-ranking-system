import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "../css/Settings.css";
import Nav from "./Nav";

function Settings() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  // console.log(`JWT token: ${jwtToken}`); // debugging

  const [response, setResponse] = useState({}); // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [usernameChange, setUsernameChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then((res) => {
        setResponse(res.data); // store the response data
        setUsername(res.data.user.username);
      })
      .catch((err) => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        );
        setIsLoggedIn(false); // update this state variable, so the component re-renders
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/myProfile/save`,
        {
          username: username,
          usernameChange: usernameChange,
          passwordChange: passwordChange,
        },
        {
          headers: {
            Authorization: `JWT ${jwtToken}`,
          },
        }
      );

      const status = response.status;
      const responseData = response.data;

      if (status === 201) {
        setUsername(responseData.newUser);
        setMessage(responseData.msg);
        setUsernameChange("");
        setPasswordChange("");
      } else {
        console.error(`Unexpected status code: ${status}`);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setMessage(error.response.data.msg);
        console.log(error);
        setUsernameChange("");
        setPasswordChange("");
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="Settings">
            <h1>Settings</h1>
            <h4>
              <Link id="link" to="/profile">
                {username}
              </Link>
            </h4>
            <form enctype="multipart/form-data" onSubmit={handleSubmit}>
              <div class="input-group">
                <label for="username">Change username: </label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  value={usernameChange}
                  onChange={(e) => setUsernameChange(e.target.value)}
                  required
                />
              </div>
              <br />
              <div class="input-group">
                <label for="password">Change password: </label>
                <br />
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={passwordChange}
                  onChange={(e) => setPasswordChange(e.target.value)}
                  required
                />
              </div>
              <br />
              <div>
                <input class="button" type="submit" value="Save" />
              </div>
              {message && <h1>{message}</h1>}
              <br />
              <button type="button" onClick={(e) => logout(e)}>
                Logout
              </button>
            </form>
            <br />
          </div>
          <Nav isLoggedIn={true} />
        </>
      ) : (
        <Navigate to="/login?error=protected" />
      )}
    </>
  );
}

export default Settings;
