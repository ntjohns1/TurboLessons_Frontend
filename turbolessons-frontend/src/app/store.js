import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// RTK Query APIs (server state)
import { lessonsApi } from "../components/TeacherComponents/Lessons/lessonsApi";
import { studentsApi } from "../components/TeacherComponents/Students/studentsApi";

// Import all reducers from both student and teacher stores
import teacherLessonsReducer from "../components/TeacherComponents/Lessons/LessonSlice";
import studentReducer from "../components/TeacherComponents/Students/StudentSlice";
import billingReducer from "../components/TeacherComponents/Billing/BillingSlice";
import teacherMessageReducer from "../components/TeacherComponents/Messages/TeacherMessageSlice";
import videoReducer from "../components/TeacherComponents/Videos/VideoSlice";

import studentDashboardReducer from "../components/StudentComponents/Dashboard/StudentDashboardSlice";
import paymentsReducer from "../components/StudentComponents/Payments/PaymentsSlice";
import studentMessageReducer from "../components/StudentComponents/Messages/StudentMessageSlice";
import libraryReducer from "../components/StudentComponents/Library/LibrarySlice";
import profileReducer from "../components/StudentComponents/Profile/ProfileSlice";

/**
 * Creates a role-based reducer configuration
 * @param {string} role - 'student' or 'teacher'
 * @returns {Object} - Reducer configuration for the specified role
 */
const createRoleBasedReducer = (role) => {
  if (role === "student") {
    return {
      // Student role reducers
      studentDashboard: studentDashboardReducer,
      payments: paymentsReducer,
      studentMessages: studentMessageReducer,
      library: libraryReducer,
      profile: profileReducer,
    };
  } else {
    // Teacher/Admin role reducers
    return {
      students: studentReducer,
      lessons: teacherLessonsReducer,
      billing: billingReducer,
      teacherMessages: teacherMessageReducer,
      videos: videoReducer,
    };
  }
};

/**
 * Configure the Redux store based on user role
 * @param {string} role - 'student' or 'teacher'
 * @returns {Object} - Configured Redux store
 */
export const configureAppStore = (role) => {
  console.log(`Configuring store for role: ${role}`);

  const store = configureStore({
    reducer: {
      ...createRoleBasedReducer(role),
      // RTK Query API reducers (always present so their middleware has a home).
      [lessonsApi.reducerPath]: lessonsApi.reducer,
      [studentsApi.reducerPath]: studentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(lessonsApi.middleware)
        .concat(studentsApi.middleware),
  });

  // Enables refetchOnFocus / refetchOnReconnect behavior for RTK Query.
  setupListeners(store.dispatch);

  return store;
};

// Create a default store (will be replaced by the role-specific store)
const store = configureAppStore("teacher");

export default store;
