import { EventBus } from './event-bus.js';
import { THEMES } from '../config/theme-config.js';

/**
 * Central State Store
 */
class StateStore {
  constructor() {
    this.state = {
      theme: THEMES.DARK,
      activeSection: 'hero',
      projectFilter: 'all',
      isMobileNavOpen: false,
      isModalOpen: false,
      activeModalId: null
    };
  }

  /**
   * Get current state snapshot
   * @returns {Object}
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Update state fragment and notify listeners
   * @param {Object} newState 
   */
  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    EventBus.publish('state:change', { currentState: this.state, prevState });
  }
}

export const Store = new StateStore();
