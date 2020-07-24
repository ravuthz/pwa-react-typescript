import AxiosService, { authHeader, BASE_API_URL } from './axios.service';

const getUserBoard = () => {
  return AxiosService.get(BASE_API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return AxiosService.get(BASE_API_URL + "admin", { headers: authHeader() });
};

const getPublicContent = () => {
  return AxiosService.get(BASE_API_URL + "all");
};

export default {
  getUserBoard,
  getAdminBoard,
  getPublicContent,
};