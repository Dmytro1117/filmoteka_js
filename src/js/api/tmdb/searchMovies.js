import { Notify } from 'notiflix';

import { moviedbApi } from './tmdbApi';
import loader from '../../loader';

export async function searchMovies(searchParams) {
  loader();
  try {
    const res = await moviedbApi.get(searchParams.END_POINT, {
      params: searchParams.params,
    });
    loader();
    return res.data;
  } catch (error) {
    Notify.failure('Something went wrong');
    return;
  }
}

export const search = { params: null };
