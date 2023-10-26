//for auth: https://stackoverflow.com/questions/71960194/update-navbar-after-success-login-or-logout-redirection
//for context: https://react.dev/learn/passing-data-deeply-with-context
//TODO: clean up using context docs rather than stackoverflow answer lol
//TODO: currently assuming that everyone is authorized, need to change inital value of auth from true to false
//TODO: fix axios get request
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/logged-user/',
          { withCredentials: true }
        );
        setUser(res.data);
      } catch(error) {
        setUser(null);
      };
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;