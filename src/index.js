import './js/features/theme-switcher/theme-switcher';
import './js/features/upToTop/upToTop';
import './js/features/trend-slider/slider-trends';
import './js/features/auth/authModalWindowContent';
import './js/helpers/helpers';
import './js/modal-developer';
import { renderMovieList } from './js/renderMovieList';
import { refs } from './js/constants/refs';
import loader from './js/loader';
import { renderTrendingMoviesSetup } from './js/renderMovieList';
import { onSearchFormSubmit } from './js/onSearchFormSubmit';
import { onPaginationBtnClick } from './js/pagination/onPaginationBtnClick';
import './js/pagination/createPagination';
import { authObserver } from './js/api/firebase/firebaseApi';
import {
  showAuthorisedFields,
  showUnauthorisedFields,
} from './js/features/auth/authModalWindowContent';
import { search } from './js/api/tmdb/searchMovies';
import {
  onLinkPlayClick,
  onLoadMarkup,
} from './js/features/trend-slider/slider-trends';

loader();
authObserver([showAuthorisedFields], [showUnauthorisedFields]);

renderTrendingMoviesSetup();

refs.paginationBox.addEventListener('click', e => {
  search.pagination = true;
  onPaginationBtnClick(e.target, renderMovieList);
});

refs.headerForm.addEventListener('submit', onSearchFormSubmit);

window.addEventListener('load', onLoadMarkup);
refs.swiperWrapper.addEventListener('click', onLinkPlayClick);

loader();
