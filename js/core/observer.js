import { CONFIG } from '../config/constants.js';
import { EventBus } from './event-bus.js';

/**
 * Shared IntersectionObserver Factory Service
 */
class ObserverService {
  constructor() {
    this.observer = null;
  }

  /**
   * Initialize observer instance
   */
  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            EventBus.publish('element:intersect', entry.target);
          }
        });
      }, {
        threshold: CONFIG.OBSERVER_THRESHOLD,
        rootMargin: '0px 0px -50px 0px'
      });

      this.observeAll();
    } else {
      // Fallback for browsers lacking IntersectionObserver
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    }
  }

  /**
   * Observe all elements matching reveal class
   */
  observeAll() {
    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach(target => {
      if (this.observer) {
        this.observer.observe(target);
      }
    });
  }
}

export const Observer = new ObserverService();
