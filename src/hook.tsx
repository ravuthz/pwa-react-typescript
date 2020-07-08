import { useEffect, useState } from "react";

export const useWindowEvent = (event: any, callback: any) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => setNetwork(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);
    return () => {
      window.removeEventListener("online", updateNetwork);
      window.removeEventListener("offline", updateNetwork);
    };
  });

  return { isOnline };
};

export const useJsonFetch = (url: string, options: any = {}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { response, loading, error };
};