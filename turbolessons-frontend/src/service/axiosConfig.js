import axios from "axios";
import config from "../config";
import { useOktaAuth } from "@okta/okta-react";
import EditStudent from "../components/TeacherComponents/Students/EditStudent";

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
