import React from 'react';

import { AuthProvider } from './auth';
import { UserProvider } from './user';
import { TodoProvider } from './todo';

const AppCtxProvider = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>
        <TodoProvider>
          {children}
        </TodoProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default AppCtxProvider;