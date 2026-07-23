import { EventBus } from '../core/event-bus.js';

export const initAnimations = () => {
  EventBus.subscribe('element:intersect', (element) => {
    // Scroll reveal handling managed via Observer service
  });
};
