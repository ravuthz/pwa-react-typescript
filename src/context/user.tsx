import React from 'react';

import { useAuthCtx } from './auth';

const UserContext = React.createContext({});

export const UserProvider = (props: any) => {
  const context = useAuthCtx();
  return <UserContext.Provider value={context} {...props} />;
}

export const useUserCtx: any = () => React.useContext(UserContext);