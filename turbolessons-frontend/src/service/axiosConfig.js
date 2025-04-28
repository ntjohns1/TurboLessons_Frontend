import axios from 'axios';

// Determine base URL based on environment
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/api'
  : 'https://www.turbolessons.com/api';

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