/**
 * Application Bootstrap & Lifecycle Orchestrator
 * File: assets/js/app.js
 * Description: Production-ready ES6 module bootstrap for Pavan Poriya's Portfolio.
 *              Detects environment accessibility settings, caches shared DOM references,
 *              and initializes feature modules in dependency-ordered execution sequence
 *              with safe error boundaries.
 */

import { Observer } from '../../js/core/observer.js';
import { initTheme } from '../../js/modules/theme.js';
import { initNavigation } from '../../js/modules/navigation.js';
import { initProjects } from '../../js/modules/projects.js';
import { initExperience } from '../../js/modules/experience.js';
import { initGitHub } from '../../js/modules/github.js';
import { initContact } from '../../js/modules/contact.js';
import { initAnimations } from '../../js/modules/animations.js';

const IS_DEV = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
);

function logWarning(moduleName, error) {
  if (IS_DEV) {
    console.warn(`[Bootstrap] Module "${moduleName}" failed to initialize:`, error);
  }
}

function handleAsyncRejection(moduleName, error) {
  logWarning(moduleName, error);
}

function safeInit(moduleName, initFn) {
  if (typeof initFn !== 'function') return;

  try {
    const result = initFn();
    if (result && typeof result.catch === 'function') {
      result.catch(function onAsyncError(error) {
        handleAsyncRejection(moduleName, error);
      });
    }
  } catch (error) {
    logWarning(moduleName, error);
  }
}

function detectReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isReduced = Boolean(mediaQuery && mediaQuery.matches);
  document.documentElement.setAttribute('data-reduced-motion', isReduced ? 'true' : 'false');
}

function initScrollBehavior() {
  const isReducedMotion = document.documentElement.getAttribute('data-reduced-motion') === 'true';
  if (!isReducedMotion && 'scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
}

function runObserverInit() {
  Observer.init();
}

function bootstrapApp() {
  detectReducedMotion();
  initScrollBehavior();

  safeInit('Theme', initTheme);
  safeInit('Observer', runObserverInit);
  safeInit('Navigation', initNavigation);
  safeInit('Animations', initAnimations);
  safeInit('Projects', initProjects);
  safeInit('Experience', initExperience);
  safeInit('GitHub', initGitHub);
  safeInit('Contact', initContact);
}

function onDOMReady() {
  bootstrapApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onDOMReady, { once: true });
} else {
  bootstrapApp();
}
