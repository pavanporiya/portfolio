/**
 * DOM Helper Utilities
 */

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/**
 * Safely set text content without HTML injection
 * @param {HTMLElement} element 
 * @param {string} text 
 */
export const setText = (element, text) => {
  if (element) {
    element.textContent = text || '';
  }
};

/**
 * Toggle CSS class on element
 * @param {HTMLElement} element 
 * @param {string} className 
 * @param {boolean} force 
 */
export const toggleClass = (element, className, force) => {
  if (element) {
    element.classList.toggle(className, force);
  }
};
