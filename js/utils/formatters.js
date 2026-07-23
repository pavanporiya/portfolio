/**
 * Formatting and Sanitization Helpers
 */

/**
 * Format numbers with thousand separators
 * @param {number} num 
 * @returns {string}
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num || 0);
};

/**
 * Escape HTML to prevent XSS
 * @param {string} str 
 * @returns {string}
 */
export const escapeHTML = (str) => {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
};
