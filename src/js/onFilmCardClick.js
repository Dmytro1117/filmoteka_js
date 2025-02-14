import { getMoviesDetails } from './api/tmdb/getMoviesDetails';
import openModalCard from './modalCard';
import loader from './loader';

export function onFilmCardClick() {
  const id = this.dataset.action;
  loader();
  getMoviesDetails(id).then(movie => openModalCard(movie));
  loader();
}
