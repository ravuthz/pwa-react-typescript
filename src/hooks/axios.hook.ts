import AxiosService from '../services/axios.service';
import { makeUseAxios } from 'axios-hooks';

const useAxios = makeUseAxios({
  axios: AxiosService
});

export default useAxios;