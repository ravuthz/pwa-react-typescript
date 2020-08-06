import React from 'react';

import { AuthProvider } from './auth';
import { UserProvider } from './user';
import { TodoProvider } from './todo';
import { CommentProvider } from './comment';

const AppCtxProvider = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>
        <TodoProvider>
          <CommentProvider>
            {children}
          </CommentProvider>
        </TodoProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default AppCtxProvider;