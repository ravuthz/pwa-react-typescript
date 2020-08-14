import Axios from "axios";
import * as ls from "local-storage";

const USER_KEY = 'user';
const AUTH_KEY = 'auth';
const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const axios = Axios.create({
  // timeout: 1000,
  baseURL: BASE_API_URL,
  headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded'
  },

  // transformResponse: [(response, headers) => {
  //   console.log('transformResponse: ', response);
  //   if (response && response.data) {
  //     return response.data.content || [];
  //   }
  //   return response;
  // }]
});

// axios.interceptors.request.use((config) => {
//   console.log('axios.interceptors.request: ', config);
//   return config;
// });
//
// axios.interceptors.response.use((response) => {
//   console.log('axios.interceptors.response: ', response);
//   return response;
// });

const setUser = (data: any) => {
  if (!data) {
    return ls.remove(USER_KEY);
  }
  return ls.set<any>(USER_KEY, data);
};

const getUser = () => {
  return ls.get<any>(USER_KEY);
}

const setAuth = (data: boolean) => {
  if (!data) {
    return ls.remove(AUTH_KEY);
  }
  return ls.set<boolean>(AUTH_KEY, data);
}

const getAuth = () => {
  return ls.get<boolean>(AUTH_KEY);
}

const authUpdate = () => {
  const user = getUser();
  if (user && user.token_type && user.access_token) {
    axios.defaults.headers.common['Authorization'] = `${user.token_type} ${user.access_token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

const authHeader = () => {
  const user = getUser();
  let headers: any = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',

    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': '*',
    // 'Access-Control-Allow-Credentials': false,
    // 'Access-Control-Max-Age': 86400,
    // 'Access-Control-Allow-Headers': '*'
  };
  if (user && user.token_type && user.access_token) {
    headers = {
      ...headers,
      'Authorization': `${user.token_type} ${user.access_token}`
    };
  }
  return headers;
}

export default axios;
export {
  USER_KEY,
  BASE_API_URL,
  getUser,
  setUser,
  getAuth,
  setAuth,
  authHeader,
  authUpdate
}