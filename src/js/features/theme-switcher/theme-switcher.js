import { THEME_STORAGE, THEMES } from '../../constants/app_const';
import { localStorageAPI } from '../../localStorageAPI';

const themeSwitchFormEl = document.querySelector('.js-theme-form');
const themeNameEl = document.querySelector('.js-theme-name');
const body = document.querySelector('body');
const themeInput = themeSwitchFormEl.querySelector('input');

const { dark, light } = THEMES;

themeSwitchFormEl.addEventListener(`click`, changeTheme);

function changeTheme(e) {
  const isDark = e.target.checked;

  localStorageAPI.save(THEME_STORAGE, dark);

  if (isDark) {
    localStorageAPI.save(THEME_STORAGE, dark);
    themeNameEl.textContent = 'Dark';
    body.classList.add('dark-theme');
  }
  if (!isDark) {
    localStorageAPI.save(THEME_STORAGE, light);
    themeNameEl.textContent = 'Light';
    body.classList.remove('dark-theme');
  }
}

let activeTheme = localStorageAPI.load(THEME_STORAGE);

if (activeTheme === null || activeTheme === 'onLight') {
  localStorageAPI.save(THEME_STORAGE, light);
  themeNameEl.textContent = 'Light';
} else {
  localStorageAPI.save(THEME_STORAGE, dark);
  themeNameEl.textContent = 'Dark';
  body.classList.add('dark-theme');
  themeInput.checked = true;
}
