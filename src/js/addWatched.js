import { dynRefs } from './constants/dynamicRefs';
import {
  STORAGE,
  DB_STORAGE,
  BUTTON_LABEL_QUEUE_ADD,
  BUTTON_LABEL_WATCHED_REMOVE,
  BUTTON_LABEL_WATCHED_ADD,
} from './constants/app_const';
import { refs } from './constants/refs';
import { onFilmCardClick } from './onFilmCardClick';
import { localStorageAPI } from './localStorageAPI';

import { auth } from './api/firebase/firebaseConfig';
import { postData } from './api/firebase/firebaseApi';
import { removeFromLibraryList, addToLibrary } from './helpers/library-main';

const { headerWatchedBtn, mainList } = refs;


export async function addWatched(e) {
  let loadStorage;
  let userStorage;
  if (auth.currentUser) {
    userStorage = DB_STORAGE;
    loadStorage = localStorageAPI.load(DB_STORAGE);
  } else {
    userStorage = STORAGE;
    loadStorage = localStorageAPI.load(STORAGE);
  }
  const { watch, favorites } = loadStorage;
  const { addToWatchedBtn, addToQueueBtn } = dynRefs();
  const id = e.currentTarget.dataset.id;
  const btnCondition = e.target.getAttribute('data-btn');
  const indexOfWatchedMovie = watch.indexOf(id);
  const indexOfQueuedMovie = favorites.indexOf(id);

  if (btnCondition === 'remove') {
    watch.splice(indexOfWatchedMovie, 1);

    if (auth.currentUser) {
      try {
        await postData(loadStorage);
      } catch (error) {
        Notify.failure('Something went wrong');
      }
    }
    localStorageAPI.save(userStorage, loadStorage);
 
    if (refs.libBtn && headerWatchedBtn.classList.contains('button--accent')) {
      removeFromLibraryList(id);
    }

    e.target.setAttribute('data-btn', 'add');
    e.target.textContent = BUTTON_LABEL_WATCHED_ADD;

    return;
  }

  watch.push(id);

  if (refs.libBtn && headerWatchedBtn.classList.contains('button--accent')) {
    try {
      await addToLibrary(id);
      document
        .querySelector(`[data-action='${id}']`)
        .addEventListener('click', onFilmCardClick);
    } catch (error) {}
  }

  if (indexOfQueuedMovie > -1) {
    favorites.splice(indexOfQueuedMovie, 1);
    addToQueueBtn.setAttribute('data-btn', 'add');
    addToQueueBtn.textContent = BUTTON_LABEL_QUEUE_ADD;

    if (refs.libBtn && !headerWatchedBtn.classList.contains('button--accent')) {
      removeFromLibraryList(id);
    }
  }
  if (auth.currentUser) {
    await postData(loadStorage);
  }
  localStorageAPI.save(userStorage, loadStorage);

  e.target.setAttribute('data-btn', 'remove');
  e.target.textContent = BUTTON_LABEL_WATCHED_REMOVE;
}
