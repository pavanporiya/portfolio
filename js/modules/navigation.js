import { $, $$ } from '../utils/dom.js';
import { debounce } from '../utils/debounce.js';

export const initNavigation = () => {
  const header = $('#site-header');
  const toggleBtn = $('#nav-toggle');
  const menu = $('#nav-menu');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  // Mobile Drawer Toggle
  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-active');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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
          link.classList.remove('is-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
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
