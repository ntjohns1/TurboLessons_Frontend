import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

// Base configuration
const api = axios.create({
  baseURL: "https://www.turbolessons.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Include the access token
api.interceptors.request.use(
  async (config) => {
    const { oktaAuth } = useOktaAuth();
    const accessToken = await oktaAuth.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
