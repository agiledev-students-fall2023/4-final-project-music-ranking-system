//for auth: https://stackoverflow.com/questions/71960194/update-navbar-after-success-login-or-logout-redirection
//for context: https://react.dev/learn/passing-data-deeply-with-context
//TODO: clean up using context docs rather than stackoverflow answer lol
//TODO: currently assuming that everyone is authorized, need to change inital value of auth from true to false
//TODO: fix axios get request
//TODO: change user from just username to {username, password}?
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem("auth")? localStorage.getItem("auth"): false)
  const [user, setUser] = useState(localStorage.getItem("username")? localStorage.getItem("username"): false);

  // useEffect(() => {
  //   const isAuth = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/loggeduser`,);
  //       setUser(res.data);
  //     } catch(error) {
  //       setUser(null);
  //     };
  //   };

  //   isAuth();
  // }, [auth]);
  // the context passed down is object that contains the state variable auth, setAuth, and user
  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;