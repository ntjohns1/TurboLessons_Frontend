import { configureStore } from '@reduxjs/toolkit';
import lessonsReducer from '../components/TeacherComponents/Lessons/LessonSlice';


export const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
    // Add other reducers here
  },
});

export default store;