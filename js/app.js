import { Observer } from './core/observer.js';
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initProjects } from './modules/projects.js';
import { initGitHub } from './modules/github.js';
import { initContact } from './modules/contact.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjects();
  initGitHub();
  initContact();
  initAnimations();
  
  Observer.init();
});
