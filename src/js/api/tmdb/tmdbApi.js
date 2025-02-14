import axios from 'axios';
import { TMDB_KEY } from '../../constants/envConsts';

const BASE_URL = 'https://api.themoviedb.org/3/';

export const moviedbApi = axios.create({
  baseURL: BASE_URL,
  params: { api_key: TMDB_KEY },
});

export const trendsSearchParams = {
  END_POINT: 'trending/movie/day',
  params: {
    page: 1,
  },
  pagination: false,
};

export const movieSearchParams = {
  END_POINT: 'search/movie',
  params: {
    query: '',
    page: 1,
  },
  pagination: false,
};
