import React, { createContext, useContext, useState } from 'react';

const Auth = createContext({});

const AuthProvider = (props: any) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    // setUser(res);
    // setToken(res);
    setAuthenticated(true);
  }

  const logout = () => {

  }

  return (<Auth.Provider value={{
    user,
    setUser,
    authenticated,
    setAuthenticated
  }} {...props} />);
}

const useAuthCtx: any = () => useContext(Auth);

export { AuthProvider, useAuthCtx };