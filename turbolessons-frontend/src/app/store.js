import { configureStore } from "@reduxjs/toolkit";
import lessonsReducer from "../components/TeacherComponents/Lessons/LessonSlice";
import studentReducer from "../components/TeacherComponents/Students/StudentSlice";
import billingReducer from "../components/TeacherComponents/Billing/BillingSlice";
import teacherMessageReducer from "../components/TeacherComponents/Messages/TeacherMessageSlice";
import videoReducer from "../components/TeacherComponents/Videos/VideoSlice";
import studentMessageReducer from "../components/StudentComponents/Messages/StudentMessageSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    lessons: lessonsReducer,
    billing: billingReducer,
    teacherMessages:  teacherMessageReducer,
    videos: videoReducer,
    studentMessages: studentMessageReducer,
  },
});

export default store;
