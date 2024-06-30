import api from './axiosConfig';

export const getStudentProfile = async (id) => {
  try {
    const response = await api.get(`/users/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error;
  }
};

export const getStudentsByTeacher = async (principle) => {
  try {
    const response = await api.get(`/users/teacher/${principle}`);
    const students = response.data.map(s => ({
      id: s.id,
      displayName: s.profile.displayName,
      email: s.profile.email,
    }));
    return students;
  } catch (error) {
    console.error('Error fetching students by teacher:', error);
    throw error;
  }
};

// TODO: should automatically place user in teacher's own students or admin can assign to any teacher
export const createStudent = async (formState) => {
  try {
    const response = await api.post('/users', formState);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const editStudent = async (id, formState) => {
  try {
    const response = await api.put(`/users/${id}`, formState);
    return response.data;
  } catch (error) {
    console.error('Error editing student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};