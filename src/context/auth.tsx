import React, { createContext, memo, useContext, useEffect, useState } from 'react';
import { getAuth, getUser } from '../services/axios.service';

const AuthContext = createContext({});

export const AuthProvider = memo((props: any) => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const value = {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    username, 
    setUsername
  };
  useEffect(() => {
    setUser(getUser());
    setAuthenticated(getAuth());
  }, []);
  return (<AuthContext.Provider value={value} {...props} />);
})

export const useAuthCtx: any = () => useContext(AuthContext);