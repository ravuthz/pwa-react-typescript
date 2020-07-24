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

const AuthRoute: React.FC<any> = (authRouteProps: AuthRouteProps): JSX.Element => {

  const { layout: Layout, component: Component, path, exact, hidden, render } = authRouteProps;

  const history = useHistory();

  const renderComponent: any = (props: any) => {
    return render ? render(props) : (Component ? <Component {...props} /> : <></>);
  };

  return (
    <ReactRoute
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) => {
        if (!hidden && !AuthService.isAuthenticate()) {
          history.push('/login', { from: props.location });
          // const to = { pathname: '/login', state: { from: props.location } };
          // return <Redirect to={to}/>;
        }
        return Layout ? <Layout>{renderComponent(props)}</Layout> : <>{renderComponent(props)}</>;
      }}
    />
  );
};

export default AuthRoute;
