import { moviedbApi } from './tmdbApi';
import { trendsSearchParams } from '../../api/tmdb/tmdbApi';
import { Notify } from 'notiflix';

export async function fetchTodayPopularMovies() {
  try {
    const response = await moviedbApi.get(
      trendsSearchParams.END_POINT,
      trendsSearchParams.params
    );

    return response.data;
  } catch (err) {
    Notify.failure('Something went wrong');
    return;
  }
}
