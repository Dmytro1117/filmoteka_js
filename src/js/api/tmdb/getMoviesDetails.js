import { moviedbApi } from './tmdbApi';
import { Notify } from 'notiflix';

const END_POINT_MOVIE_BY_ID = 'movie/';

export async function getMoviesDetails(id) {
  try {
    const response = await moviedbApi.get(END_POINT_MOVIE_BY_ID + id);
    return response.data;
  } catch (err) {
    Notify.failure('Something went wrong');
    return;
  }
}
