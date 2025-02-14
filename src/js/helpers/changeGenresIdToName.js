import { genres } from '../api/tmdb/getGenres';
import { Notify } from 'notiflix';

export async function changeGenresIdToName(movies) {
  try {
    const genersList = await genres();
    movies.forEach(element => {
      const array = element.genre_ids;
      if (!array) return 'Other';
      const newArr = array.map(elem => {
        if (genersList.find(x => x.id === elem)) {
          return genersList.find(x => x.id === elem).name;
        } else {
          return 'Other';
        }
      });

      element.genre_ids = newArr.join(', ');
    });
  } catch (error) {
    Notify.failure('Something went wrong');
  }
}
