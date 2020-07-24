import AxiosService, { delUser, getUser, setUser } from './axios.service';

const LOGIN_URL = `/token/`;
const REGISTER_URL = `/register/`;

// const formData = new FormData();
// if (body) {
//   for (const key in body) {
//     if (body.hasOwnProperty(key)) {
//       formData.append(key, body[key]);
//     }
//   }
// }

const login = (body: any) => {
  body.grant_type = body.grant_type || process.env.REACT_APP_API_GRANT_TYPE;
  body.client_id = body.client_id || process.env.REACT_APP_API_CLIENT_ID;
  body.client_secret = body.client_secret || process.env.REACT_APP_API_CLIENT_SECRET;
  return AxiosService.post(LOGIN_URL, body)
    .then(response => response.data)
    .then((data) => {
      if (data) {
        setUser(data);
      }
      return data;
    });
};

const logout = () => {
  return new Promise((resolve, reject) => {
    delUser();
    resolve(null);
  });
};

const register = (body: any) => {
  return AxiosService.post(REGISTER_URL, body);
};

const getCurrentUser = () => {
  return getUser();
};

const isAuthenticate = () => {
  const { token_type, access_token } = getUser();
  return token_type && access_token;
}

const authorize = () => {
  const user = getUser();
  if (user && user.token_type && user.access_token) {
    AxiosService.defaults.headers.common['Authorization'] = `${user.token_type} ${user.access_token}`;
  } else {
    delete AxiosService.defaults.headers.common['Authorization'];
  }
}

const headers = () => {
  const user = getUser();
  if (user && user.token_type && user.access_token) {
    return { 'Authorization': `${user.token_type} ${user.access_token}` }
  } else {
    return {};
  }
}

export default {
  login,
  logout,
  register,
  headers,
  authorize,
  getCurrentUser,
  isAuthenticate,
};