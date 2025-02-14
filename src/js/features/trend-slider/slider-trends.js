import Swiper, { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
// import 'swiper/swiper.scss';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchTrailer } from '../../api/tmdb/fetchTrailer';
import { fetchTodayPopularMovies } from '../../api/tmdb/fetchTodayPopularMovies';

export const swiper = new Swiper('.swiper', {
  modules: [Navigation, Autoplay],
  slidesPerView: 4,
  spaceBetween: 8,
  autoplay: {
    enabled: true,
    delay: 3500,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 2,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 4,
    },
    1280: {
      slidesPerView: 8,
      spaceBetween: 10,
    },
  },
});

const renderMarkupSlider = (movies, sprite) => {
  const markup = movies
    .map(({ id, title, poster_path }) => {
      return `<li class="swiper-slide">
        <a class="swiper-link" href="#" data-id="${id}"><img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
            <div class="swiper-backdrop">
                <svg class="icon-play">
                    <use href="${sprite}#icon-play"></use>
                </svg>
            </div>
        </a>
      </li>`;
    })
    .join('');
  document
    .querySelector('.swiper-wrapper')
    .insertAdjacentHTML('beforeend', markup);
};

const spriteURL = new URL('../../../images/sprite.svg', import.meta.url);

export const onLoadMarkup = async () => {
  try {
    const { results } = await fetchTodayPopularMovies();
    renderMarkupSlider(results, spriteURL);
  } catch (error) {
    console.error(error.message);
  }
};

export const onLinkPlayClick = async evt => {
  evt.preventDefault();
  if (evt.target.nodeName !== 'A') return;
  try {
    const { results } = await fetchTrailer(evt.target.dataset.id);
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
    console.error(error.message);
  }
};
