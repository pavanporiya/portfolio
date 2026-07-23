import { CONFIG } from '../config/constants.js';
import { THEMES } from '../config/theme-config.js';
import { Store } from '../core/store.js';
import { getItem, setItem } from '../utils/storage.js';

export const initTheme = () => {
  const savedTheme = getItem(CONFIG.STORAGE_KEYS.THEME);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (systemPrefersDark ? THEMES.DARK : THEMES.LIGHT);
  applyTheme(initialTheme);

  const themeToggleBtn = document.querySelector('#theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = Store.getState().theme;
      const nextTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
      applyTheme(nextTheme);
    });
  }
};

const applyTheme = (theme) => {
  document.documentElement.classList.remove(THEMES.DARK, THEMES.LIGHT);
  document.documentElement.classList.add(theme);
  setItem(CONFIG.STORAGE_KEYS.THEME, theme);
  Store.setState({ theme });
};
