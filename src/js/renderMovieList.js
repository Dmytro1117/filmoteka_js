import { Notify } from 'notiflix';
import { refs } from './constants/refs';
import { dynRefs } from './constants/dynamicRefs';
import { searchMovies, search } from './api/tmdb/searchMovies';
import { changeGenresIdToName } from './helpers/changeGenresIdToName';
import createMarkUp from '../templates/film-cards.hbs';
import { createPagination } from './pagination/createPagination';
import { onFilmCardClick } from './onFilmCardClick';
import { trendsSearchParams, movieSearchParams } from './api/tmdb/tmdbApi';

export async function renderMovieList(page = 1) {
  search.params.params.page = page;
  const listOfMovies = await searchMovies(search.params);

  if (!listOfMovies?.results?.length) {
    Notify.warning('Sorry, there is no result. Please try another keyword');

    return;
  }

  await changeGenresIdToName(listOfMovies.results);

  if (!search.pagination && search.params.params.query) {
    Notify.success(`We found for you ${listOfMovies.total_results} movies`);
  }
  refs.mainList.innerHTML = createMarkUp(listOfMovies.results);

  dynRefs().movieElements.forEach(card =>
    card.addEventListener('click', onFilmCardClick)
  );

  createPagination(page, listOfMovies.total_pages);
}

export async function renderTrendingMoviesSetup(page = 1) {
  search.params = trendsSearchParams;
  search.params.params.page = page;
  search.pagination = false;
  renderMovieList(page);
}

export async function renderSearchListSetup(nameForSrc, page = 1) {
  search.params = movieSearchParams;
  search.pagination = false;
  search.params.params.page = page;
  search.params.params.query = nameForSrc;
  renderMovieList(page);
}
