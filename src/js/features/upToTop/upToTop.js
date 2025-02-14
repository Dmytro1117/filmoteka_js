import { refs } from '../../constants/refs';

const upBtn = refs.btnToTop;
window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
  if (window.scrollY > 750) {
    upBtn.classList.add('visible');
  } else {
    upBtn.classList.remove('visible');
  }
}

upBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
