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

export const fetchAllEvents = async () => {
  try {
    const response = await api.get(`/lessons`);
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

export const fetchEventsByTeacher = async (teacher) => {
  try {
    const response = await api.get(`/lessons/teacher/${teacher}`);
    const events = response.data.map(s => ({
      id: s.id,
      start: s.startTime,
      end: s.endTime,
      title: s.title,
    }));
    return events;
  } catch (error) {
    console.error('Error fetching events by teacher:', error);
    throw error;
  }
};

export const fetchEventsByStudent = async (student) => {
  try {
    const response = await api.get(`/lessons/student/${student}`);
    const events = response.data.map(s => ({
      id: s.id,
      start: s.startTime,
      end: s.endTime,
      title: s.title,
    }));
    return events;
  } catch (error) {
    console.error('Error fetching events by student:', error);
    throw error;
  }
};

export const fetchEventsByDate = async (date) => {
  try {
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    const response = await api.get(`/lessons/date/${formattedDate}`);
    const events = response.data.map(s => ({
      id: s.id,
      start: s.startTime,
      end: s.endTime,
      title: s.title,
    }));
    return events;
  } catch (error) {
    console.error('Error fetching events by date:', error);
    throw error;
  }
};

export const fetchEventsByTeacherAndDate = async (teacher, date) => {
  try {
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    const response = await api.get(`/lessons/${teacher}/${formattedDate}`);
    const events = response.data.map(s => ({
      id: s.id,
      start: s.startTime,
      end: s.endTime,
      title: s.title,
    }));
    return events;
  } catch (error) {
    console.error('Error fetching events by teacher and date:', error);
    throw error;
  }
};