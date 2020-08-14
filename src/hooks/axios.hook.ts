import AxiosService, { authHeader } from '../services/axios.service';
import { makeUseAxios } from 'axios-hooks';
import { useEffect, useState } from 'react';

const useAxios = makeUseAxios({
  axios: AxiosService
});

export const useAxiosGet = (url: string) => {
  const [result, setResult] = useState<any>([]);
  const [{ data, loading, error }, executeFetch] = useAxios({
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

  return { data, loading, error, result, executeFetch };
}

export const useAxiosPost = (url: string) => {
  const [result, setResult] = useState<any>({});
  const [{ data, loading, error }, executePost] = useAxios({
    url,
    headers: authHeader(),
    method: 'POST'
  }, { manual: true });

  useEffect(() => {
    if (error) {
      console.log('useAxiosPost.error: ', error);
    }
    if (data && data.data) {
      setResult(data.data.content || {});
    }
  }, [url, data, error]);

  return { data, loading, error, result, executePost };
}

export default useAxios;