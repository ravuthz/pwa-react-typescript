import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthService from '../../../services/auth.service';

const LogoutPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    AuthService.logout().then(() => {
      history.push('/?logged-out');
    });
  }, [history]);

  return <></>;
};

export default LogoutPage;