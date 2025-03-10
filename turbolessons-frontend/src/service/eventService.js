import api from "./axiosConfig";
import config from "../config";

const destructureAndMap = (data) => {
  return data.map(
    ({
      id,
      startTime,
      endTime,
      title,
      student,
      studentEmail,
      teacher,
      teacherEmail,
      date,
      comments,
      billingStatus
    }) => ({
      id,
      start: startTime,
      end: endTime,
      title,
      student,
      studentEmail,
      teacher,
      teacherEmail,
      date,
      comments,
      billingStatus
    })
  );
};

export const createLessonEvent = async (eventData) => {
  try {
    const { data } = await api.post("/lessons", eventData);
    return data;
  } catch (error) {
    console.error("Error creating lesson event:", error);
    throw error;
  }
};

export const fetchAllEvents = async () => {
  try {
    const { data } = await api.get(`/lessons`);
    return destructureAndMap(data);
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchEventsByTeacher = async (teacher) => {
  try {
    const { data } = await api.get(`/lessons/teacher/${teacher}`);
    console.log('data: ', data);
    
    return destructureAndMap(data);
  } catch (error) {
    console.error("Error fetching events by teacher:", error);
    throw error;
  }
};

export const fetchEventsByStudent = async (student) => {
  try {
    const { data } = await api.get(`/lessons/student/${student}`);
    return destructureAndMap(data);
  } catch (error) {
    console.error("Error fetching events by student:", error);
    throw error;
  }
};

export const fetchEventsByDate = async (date) => {
  try {
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Format date as 'YYYY-MM-DD'
    const { data } = await api.get(`/lessons/date/${formattedDate}`);
    return destructureAndMap(data);
  } catch (error) {
    console.error("Error fetching events by date:", error);
    throw error;
  }
};

export const fetchEventsByTeacherAndDate = async (teacher, date) => {
  try {
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Format date as 'YYYY-MM-DD'
    const { data } = await api.get(`/lessons/${teacher}/${formattedDate}`);
    return destructureAndMap(data);
  } catch (error) {
    console.error("Error fetching events by teacher and date:", error);
    throw error;
  }
};

export const editLessonEvent = async (id, formState) => {
  try {
    console.log('event service: ', formState);
    const response = await api.put(`/lessons/${id}`, formState);
    return response.data;
  } catch (error) {
    console.error('Error editing lesson:', error);
    throw error;
  }
};

export const deleteLessonEvent = async (id) => {
  try {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};