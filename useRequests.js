import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = 'http://localhost:5000/api';

export const useJustReleaseGamesPagination = (offset) => {
  const [page, setPage] = useState(() => (offset ? offset : 0), [offset]);
  const { data, error } = useSWR(`/getJustReleasedGamesPagination/${page || 0}`, axios, {
    dedupingInterval: 60 * 60 * 1000, //1 day
    revalidateOnFocus: false,
  });
  return {
    games: data ? data.data : [],
    error,
    setPage,
    isLoading: !data && !error,
    page: page ? page : offset ? offset : 0,
  };
};
//
export const useComingSoonGamesPagination = (offset) => {
  const [page, setPage] = useState(offset || 0);
  const { data, error } = useSWR(`/getJustComingSoonGamesPagination/${page}`, axios, {
    dedupingInterval: 60 * 60 * 1000, //1 day
    revalidateOnFocus: false,
  });
  return {
    games: data ? data.data : [],
    error,
    setPage,
    isLoading: !data && !error,
    page: page ? page : offset,
  };
};
//
export const useMostAnticipatedGamesPagination = (offset) => {
  const [page, setPage] = useState(offset || 0);
  const { data, error } = useSWR(`/getMostAnticipatedGamesPagination/${page}`, axios, {
    dedupingInterval: 60 * 60 * 1000, //1 day
    revalidateOnFocus: false,
  });
  return {
    games: data ? data.data : [],
    error,
    setPage,
    isLoading: !data && !error,
    page: page ? page : offset,
  };
};
