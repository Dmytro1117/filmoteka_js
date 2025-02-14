import { moviedbApi } from './tmdbApi';
import { Notify } from 'notiflix';

const END_POINT_TRAILER_BY_ID = 'movie/';

export async function fetchTrailer(id) {
  try {
    const response = await moviedbApi.get(
      END_POINT_TRAILER_BY_ID + id + `/videos`
    );

    return response.data;
  } catch (err) {
    Notify.failure('Something went wrong');
    return;
  }
}
