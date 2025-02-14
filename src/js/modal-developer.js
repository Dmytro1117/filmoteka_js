import { refs } from './constants/refs';
import modalInputTpl from '../templates/modal-developer.hbs';
import closeSvg from '../images/sprite.svg';
import photoPng from '../images/me.png';
import { dynRefs } from './constants/dynamicRefs';

const openModalDeveloper = document.querySelector('.open-modal-developer');
openModalDeveloper.addEventListener('click', openDeveloperModal);

function openDeveloperModal() {
  document.body.classList.add('show-modal-card');
  const htmlDeveloper = modalInputTpl({ closeSvg, photoPng });
  refs.dataBackdrop.innerHTML = htmlDeveloper;
  document.body.style.overflow = 'hidden';
  const { closeModalBtnEl, backdropEl } = dynRefs();

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
