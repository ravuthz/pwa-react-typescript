import React from 'react';
import { Route as ReactRoute, RouteProps as ReactRouteProps } from 'react-router';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import AuthService from '../../services/auth.service';

export interface AuthRouteProps extends ReactRouteProps {
  path: string;
  exact?: boolean;
  hidden?: boolean;
  layout: React.FC<any>;
  component: React.FC<RouteComponentProps>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
}

const AuthRoute: React.FC<any> = (
  { hidden, render, layout, component, ...rest }: AuthRouteProps
): JSX.Element => {
  const history = useHistory();
  return (
    <ReactRoute
      {...rest}
      render={(props: RouteComponentProps) => {
        const Layout = layout || React.Fragment;
        const Component = component || React.Fragment;
        if (!hidden && !AuthService.isAuthenticate()) {
          history.push('/login', { from: props.location });
        }

        if (render) {
          return <Layout>{render(props)}</Layout>;
        }
        return <Layout><Component {...props} /></Layout>;
      }}
    />
  );
};

export default AuthRoute;
