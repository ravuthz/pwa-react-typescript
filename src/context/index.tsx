import React from 'react';

import { AuthProvider } from './auth';
import { UserProvider } from './user';

const AppCtxProvider = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthProvider>
  );
}

export default AppCtxProvider;