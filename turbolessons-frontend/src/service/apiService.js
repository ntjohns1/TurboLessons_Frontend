import axios from 'axios';
import config from '../config';
import { useOktaAuth } from '@okta/okta-react';

// Base configuration
const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
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


// Admin Service

// Event Service
export const createLessonEvent = async (eventData) => {
    try {
        const response = await api.post(config.resourceServer.eventsUrl, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating lesson event:', error);
        throw error;
    }
};


// Messsage Service


// Video Service
export const fetchVideos = async () => {
    try {
        const response = await api.get(config.resourceServer.videoUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
};

//  Psyment Service