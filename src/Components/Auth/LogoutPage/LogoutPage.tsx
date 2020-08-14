import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthService from '../../../services/auth.service';
import { useAuthCtx } from '../../../context/auth';

const LogoutPage: React.FC = () => {
  const history = useHistory();
  const { setUser, setAuthenticated } = useAuthCtx();

  useEffect(() => {
    AuthService.logout().then(() => {
      setUser({});
      setAuthenticated(false);
      history.push('/?logged-out');
    });
  }, [history, setUser, setAuthenticated]);

  return <></>;
};

export default LogoutPage;