import React from 'react';

import { useAuthCtx } from './auth';

const User = React.createContext({});

const UserProvider = (props: any) => {
  const context = useAuthCtx();
  return <User.Provider value={context} {...props} />;
}

const useUserCtx: any = () => React.useContext(User);

export { UserProvider, useUserCtx };