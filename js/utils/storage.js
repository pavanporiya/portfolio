/**
 * LocalStorage Safe Wrapper
 */

export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('LocalStorage access blocked:', e);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('LocalStorage write failed:', e);
  }
};
