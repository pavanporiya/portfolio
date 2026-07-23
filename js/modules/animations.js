import { EventBus } from '../core/event-bus.js';

export const initAnimations = () => {
  EventBus.subscribe('element:intersect', (element) => {
    if (element.classList.contains('metrics__number') && !element.dataset.animated) {
      animateCounter(element);
    }
  });
};

const animateCounter = (element) => {
  element.dataset.animated = 'true';
  const target = parseInt(element.dataset.target, 10) || 0;
  const suffix = element.dataset.suffix || '';
  const duration = 1500;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = `${Math.floor(current)}${suffix}`;
  }, stepTime);
};
