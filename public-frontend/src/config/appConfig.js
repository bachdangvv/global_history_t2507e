/**
 * Application Configuration
 * 
 * This file contains URLs for different parts of the application
 * that are loaded from environment variables.
 */

export const config = {
  // Dashboard frontend URL - where users write, edit articles and view metrics
  dashboardURL: import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:5174',
  
  // API base URL
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  
  // Dashboard paths
  dashboardPaths: {
    home: '/user',
    createArticle: '/user/create',
    editArticle: '/user/write',
    profile: '/user/profile',
    notifications: '/user/notifications',
  },

  /**
   * Get the full dashboard URL with a specific path
   * @param {string} path - The dashboard path (e.g., '/user/create')
   * @returns {string} The full URL
   */
  getDashboardURL(path) {
    return `${this.dashboardURL}${path}`;
  },

  /**
   * Redirect user to dashboard
   * @param {string} path - The dashboard path
   */
  redirectToDashboard(path) {
    window.open(this.getDashboardURL(path), '_blank', 'noopener,noreferrer');
  },
};

export default config;
