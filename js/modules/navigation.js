import { $, $$ } from '../utils/dom.js';
import { debounce } from '../utils/debounce.js';

export const initNavigation = () => {
  const header = $('#site-header');
  const toggleBtn = $('#nav-toggle');
  const primaryNav = $('#primary-nav');
  const menu = $('#nav-menu');
  const navLinks = $$('.nav-link, .header__link');
  const sections = $$('section[id]');

  // Mobile Drawer Toggle
  if (toggleBtn && (primaryNav || menu)) {
    const toggleMenu = (forceState) => {
      const targetNav = primaryNav || menu;
      const isOpen = typeof forceState === 'boolean' 
        ? forceState 
        : !targetNav.classList.contains('is-open');

      targetNav.classList.toggle('is-open', isOpen);
      if (menu && menu !== targetNav) menu.classList.toggle('is-open', isOpen);

      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggleBtn.classList.toggle('is-active', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    };

    toggleBtn.addEventListener('click', () => toggleMenu());

    // Close drawer when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // Scroll Spy Functionality
  const handleScroll = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}` || href === `index.html#${id}`) {
            link.classList.add('active');
            link.classList.add('is-active');
          } else if (!href || (!href.includes('#') && !link.hasAttribute('aria-current'))) {
            link.classList.remove('active');
            link.classList.remove('is-active');
          } else if (href.includes('#') && href !== `#${id}` && href !== `index.html#${id}`) {
            link.classList.remove('active');
            link.classList.remove('is-active');
          }
        });
      }
    });

    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
  };

  window.addEventListener('scroll', debounce(handleScroll, 100));
};
