import AxiosService, { authHeader } from '../services/axios.service';
import { makeUseAxios } from 'axios-hooks';
import { useEffect, useState } from 'react';

const useAxios = makeUseAxios({
  axios: AxiosService
});

export const useAxiosGet = (url: string) => {
  const [result, setResult] = useState([]);
  const [{ data, loading, error }] = useAxios({
    url,
    headers: authHeader()
  });

  useEffect(() => {
    if (error) {
      console.log('useAxiosGet.error: ', error);
    }
    if (data && data.data) {
      setResult(data.data.content || []);
    }
  }, [url, data, error]);

  return { data, loading, error, result };
}

export default useAxios;