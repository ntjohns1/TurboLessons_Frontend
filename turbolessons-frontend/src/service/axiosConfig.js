import axios from 'axios';

// Relative base: same-origin in every env. The Vite dev proxy forwards /api to
// the configured backend (qac by default) for `npm run start`, and nginx proxies
// /api -> api-gateway in the built container.
const BASE_URL = '/api';

// Base configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Function to set the access token
export const setAccessToken = (accessToken) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export default api;