/**
 * Global Constants & Configuration Flags
 */
export const CONFIG = {
  GITHUB_USERNAME: 'pavanporiya',
  GITHUB_API_URL: 'https://api.github.com/users/pavanporiya/repos?sort=updated&per_page=6',
  STORAGE_KEYS: {
    GITHUB_CACHE: 'pavan_portfolio_github_cache',
    GITHUB_CACHE_TIME: 'pavan_portfolio_github_cache_time'
  },
  CACHE_TTL_MS: 24 * 60 * 60 * 1000, // 24 hours
  OBSERVER_THRESHOLD: 0.15,
  DEBOUNCE_DELAY_MS: 200
};
