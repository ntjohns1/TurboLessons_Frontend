import { configureStore } from "@reduxjs/toolkit";
import lessonsReducer from "../components/TeacherComponents/Lessons/LessonSlice";
import studentReducer from "../components/TeacherComponents/Students/StudentSlice";
import billingReducer from "../components/TeacherComponents/Billing/BillingSlice";
import messageReducer from "../components/TeacherComponents/Messages/MessageSlice";
import videoReducer from "../components/TeacherComponents/Videos/VideoSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    lessons: lessonsReducer,
    billing: billingReducer,
    messages: messageReducer,
    videos: videoReducer,
  },
});

export default store;
