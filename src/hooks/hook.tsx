import { useCallback, useEffect, useState } from "react";
import { get, set } from "idb-keyval";
import useSwr from 'swr';

export const baseUrl = 'https://jsonplaceholder.typicode.com/';

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
      if (!url) {
        return;
      }
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
  }, [url]);
  return { response, loading, error };
};

export const useSwrFetch = (path: string) => {
  if (!path) {
    throw new Error('Path is required')
  }
  const { data, error } = useSwr(path)
  return { data, error }
}

export function usePersistedState<TState>(keyToPersistWith: string, defaultState: TState) {
  const [state, setState] = useState<TState | undefined>(undefined);

  useEffect(() => {
    get<TState>(keyToPersistWith).then(retrievedState =>
      // If a value is retrieved then use it; otherwise default to defaultValue
      setState(retrievedState ?? defaultState));
  }, [keyToPersistWith, setState, defaultState]);

  const setPersistedValue = useCallback((newValue: TState) => {
    setState(newValue);
    set(keyToPersistWith, newValue);
  }, [keyToPersistWith, setState]);

  return [state, setPersistedValue] as const;
}