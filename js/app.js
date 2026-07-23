import { Observer } from './core/observer.js';
import { initNavigation } from './modules/navigation.js';
import { initProjects } from './modules/projects.js';
import { initExperience } from './modules/experience.js';
import { initGitHub } from './modules/github.js';
import { initContact } from './modules/contact.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjects();
  initExperience();
  initGitHub();
  initContact();
  initAnimations();
  
  Observer.init();
});
