/**
 * Utility functions for formatting data in the UI
 */

/**
 * Format a number as currency (USD)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date in a user-friendly format
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

/**
 * Format a timestamp (in seconds) to a date string
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted date string
 */
export const formatTimestamp = (timestamp) => {
  return formatDate(new Date(timestamp * 1000));
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format a date with full details (weekday, month, day, year)
 * @param {string|Date} dateString - The date to format
 * @returns {string} Formatted date string
 */
export const formatFullDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format a time string (hours and minutes)
 * @param {string|Date} dateString - The date/time to format
 * @returns {string} Formatted time string
 */
export const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const adjustEvents = (events) => {
  return events.map((event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return {
      ...event,
      start: new Date(
        start.getTime() - start.getTimezoneOffset() * 60000
      ).toISOString(),
      end: new Date(
        end.getTime() - end.getTimezoneOffset() * 60000
      ).toISOString(),
    };
  });
};
