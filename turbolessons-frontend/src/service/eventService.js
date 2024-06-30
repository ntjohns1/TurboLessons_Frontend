import api from './axiosConfig';
import config from '../config';

export const createLessonEvent = async (eventData) => {
  try {
    const response = await api.post('/lessons', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating lesson event:', error);
    throw error;
  }
};

export const fetchEvents = async (principle) => {
  try {
    const response = await api.get(`/lessons/teacher/${principle}`);
    const events = response.data.map(s => ({
      id: s.id,
      start: s.startTime,
      end: s.endTime,
      title: s.title,
    }));
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};