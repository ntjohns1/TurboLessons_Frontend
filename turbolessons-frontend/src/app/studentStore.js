import { configureStore } from "@reduxjs/toolkit";
import lessonsReducer from "../components/TeacherComponents/Lessons/LessonSlice";
import paymentsReducer from "../components/StudentComponents/Payments/PaymentsSlice";
import studentMessageReducer from "../components/StudentComponents/Messages/StudentMessageSlice";
import libraryReducer from "../components/StudentComponents/Library/LibrarySlice";

export const studentStore = configureStore({
  reducer: {
    lessons: lessonsReducer,
    payments: paymentsReducer,
    studentMessages: studentMessageReducer,
    library: libraryReducer,
  },
});

export default studentStore;
