/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {String} - Formatted date string
 */
exports.formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Calculate percentage
 * @param {Number} value - Current value
 * @param {Number} total - Total value
 * @param {Number} decimals - Number of decimal places
 * @returns {Number} - Calculated percentage
 */
exports.calculatePercentage = (value, total, decimals = 0) => {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;
  return Number(percentage.toFixed(decimals));
};

/**
 * Sanitize a string for database operations
 * @param {String} str - Input string
 * @returns {String} - Sanitized string
 */
exports.sanitizeString = (str) => {
  if (!str) return '';
  return str.trim().replace(/[^\w\s.-]/gi, '');
};

/**
 * Generate random string for tokens or IDs
 * @param {Number} length - Length of string
 * @returns {String} - Random string
 */
exports.generateRandomString = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Check if value is empty
 * @param {Any} value - Value to check
 * @returns {Boolean} - True if empty
 */
exports.isEmpty = (value) => 
  value === undefined || 
  value === null || 
  (typeof value === 'object' && Object.keys(value).length === 0) || 
  (typeof value === 'string' && value.trim().length === 0);