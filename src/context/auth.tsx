import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const value = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
  };
  return (<AuthContext.Provider value={value} {...props} />);
}

export const useAuthCtx: any = () => useContext(AuthContext);