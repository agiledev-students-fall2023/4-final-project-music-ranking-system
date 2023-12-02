//for auth: https://stackoverflow.com/questions/71960194/update-navbar-after-success-login-or-logout-redirection
//for context: https://react.dev/learn/passing-data-deeply-with-context
//TODO: clean up using context docs rather than stackoverflow answer lol
//TODO: currently assuming that everyone is authorized, need to change inital value of auth from true to false
//TODO: fix axios get request
//TODO: change user from just username to {username, password}?
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  response: null,
  setResponse: () => {},
  isLoggedIn: null,
  setIsLoggedIn: () => {},
  checkAuth: null,
  setCheckAuth: () => {}
});
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [checkAuth, setCheckAuth] = useState(false)
  
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  // console.log(`JWT token: ${jwtToken}`) // debugging

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false
  
  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, [checkAuth]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ response, setResponse, isLoggedIn, setIsLoggedIn, checkAuth, setCheckAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;