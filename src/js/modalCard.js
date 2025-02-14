import './api/tmdb/getMoviesDetails';
import { Notify } from 'notiflix';
import modalInputTpl from '../templates/modal-card.hbs';
import closeSvg from '../images/sprite.svg';
import youTubeSvg from '../images/sprite.svg';
import fallbackImageDesktop from '../images/desktop/poster-modal-plug-desktop.jpg';
import { dynRefs } from './constants/dynamicRefs';
import { refs } from './constants/refs';
import { addWatched } from './addWatched';
import { addQueue } from './addQueue';
import {
  STORAGE,
  DB_STORAGE,
  BUTTON_LABEL_WATCHED_REMOVE,
  BUTTON_LABEL_QUEUE_REMOVE,
} from './constants/app_const';
import './helpers/helpers';
import { localStorageAPI } from './localStorageAPI';
import { auth } from './api/firebase/firebaseConfig';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchTrailer } from './api/tmdb/fetchTrailer';

const modal = refs.modal;
let id = null;

export default function openModalCard(movie, customHtml = '') {
  document.body.classList.add('show-modal-card');

  id = movie.id;
  if (movie && !customHtml) {
    movie.closeSvg = closeSvg;
    movie.youTubeSvg = youTubeSvg;
    movie.fallbackImageDesktop = fallbackImageDesktop;
    const html = modalInputTpl(movie);
    modal.innerHTML = html;
    document.body.style.overflow = 'hidden';
  }

  if (customHtml) {
    modal.innerHTML = customHtml;
  }


  checkStorage(movie.id);
  const {
    addToWatchedBtn,
    addToQueueBtn,
    closeModalBtnEl,
    backdropEl,
    playTrailer,
  } = dynRefs();

  addToWatchedBtn.addEventListener('click', addWatched);
  addToQueueBtn.addEventListener('click', addQueue);

  playTrailer.addEventListener('click', onPlayTrailerBtn);

  if (closeModalBtnEl) {
    closeModalBtnEl.addEventListener('click', onCloseModalCard);
  }
  backdropEl.addEventListener('click', onBackdropClick);

  window.addEventListener('keydown', onEscKeyPressExit);
}

function onCloseModalCard() {
  const { closeModalBtnEl, backdropEl } = dynRefs();
  document.body.style.overflow = null;
  document.body.classList.remove('show-modal-card');
  window.addEventListener('keydown', onEscKeyPressExit);

  backdropEl.removeEventListener('click', onBackdropClick);
  closeModalBtnEl.removeEventListener('click', onCloseModalCard);
  window.removeEventListener('keydown', onEscKeyPressExit);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModalCard();
  }
}

function onEscKeyPressExit(event) {
  if (event.code === 'Escape') {
    onCloseModalCard();
  }
}

function checkStorage(id) {
  let userStorage = '',
    loadStorage = '';

  if (auth.currentUser) {
    userStorage = DB_STORAGE;
    loadStorage = localStorageAPI.load(DB_STORAGE);
  } else {
    userStorage = STORAGE;
    loadStorage = localStorageAPI.load(STORAGE);
  }
  const { addToWatchedBtn, addToQueueBtn } = dynRefs();

  if (!loadStorage) {
    return;
  }

  const { watch, favorites } = loadStorage;

  const indexOfWarchedMovie = watch.indexOf(id.toString());
  const indexOfQueueMovie = favorites.indexOf(id.toString());

  if (indexOfWarchedMovie > -1) {
    addToWatchedBtn.setAttribute('data-btn', 'remove');
    addToWatchedBtn.textContent = BUTTON_LABEL_WATCHED_REMOVE;
  }

  if (indexOfQueueMovie > -1) {
    addToQueueBtn.setAttribute('data-btn', 'remove');
    addToQueueBtn.textContent = BUTTON_LABEL_QUEUE_REMOVE;
  }
}

export const onPlayTrailerBtn = async evt => {
  evt.preventDefault();
  if (evt.currentTarget.nodeName !== 'BUTTON') return;
  try {
    const { results } = await fetchTrailer(id);
    console.log(results);
    const { key } = results[results.length - 1];
    const closeModal = e => {
      if (e.code === 'Escape') {
        instance.close();
      }
    };
    const instance = basicLightbox.create(
      `<iframe class="youtube-frame" width="900" height="600" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
      {
        onShow: () => {
          document.addEventListener('keydown', closeModal);
        },
        onClose: () => {
          document.removeEventListener('keydown', closeModal);
        },
      }
    );

    instance.show();
  } catch (error) {
    Notify.failure('Sorry, trailer not found');
    console.error(error.message);
  }
};
