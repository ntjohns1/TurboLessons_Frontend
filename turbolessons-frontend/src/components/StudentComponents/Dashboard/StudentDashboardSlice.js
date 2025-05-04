import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEventsByStudent } from "../../../service/eventService";
import {
  searchCustomerByOktaId,
  getSubscription,
} from "../../../service/billingService";
import { getUserData } from "../../../service/adminService";
import { adjustEvents } from "../../../util/formatters";

// Thunks
export const fetchStudentData = createAsyncThunk(
  "lessons/fetchStudentData",
  async ({ id }) => {
    const userData = await getUserData(id);
    return userData;
  }
);

export const fetchStudentEvents = createAsyncThunk(
  "lessons/fetchStudentEvents",
  async ({ student }) => {
    const plainEventObjects = await fetchEventsByStudent(student);
    return adjustEvents(plainEventObjects);
  }
);

export const fetchCustomerData = createAsyncThunk(
  "lessons/fetchCustomerData",
  async ({ id }) => {
    const customer = await searchCustomerByOktaId(id);
    return customer;
  }
);

export const fetchCustomerSubscriptions = createAsyncThunk(
  "lessons/fetchCustomerSubscriptions",
  async ({ id }) => {
    const subscriptions = await getSubscription(id);
    return subscriptions;
  }
);

/**
 * Calculate the next upcoming lesson from a list of lessons
 * @param {Array} lessons - Array of lesson objects
 * @returns {Object|null} - The next upcoming lesson or null if none found
 */
const calculateNextLesson = (lessons) => {
  if (!lessons || lessons.length === 0) {
    return null;
  }

  const now = new Date();

  // Filter lessons to only include upcoming ones
  const upcomingLessons = lessons.filter((lesson) => {
    const startTimeField = lesson.startTime || lesson.start;
    if (!startTimeField) {
      return false;
    }

    const lessonStartTime = new Date(startTimeField);
    return lessonStartTime > now;
  });

  // If no upcoming lessons, return null
  if (upcomingLessons.length === 0) {
    return null;
  }

  // Sort by date (ascending)
  upcomingLessons.sort((a, b) => {
    const aTime = new Date(a.startTime || a.start);
    const bTime = new Date(b.startTime || b.start);
    return aTime - bTime;
  });

  return upcomingLessons[0];
};

export const extractTeachers = (groups) => {
  if (!groups || !Array.isArray(groups)) {
    return [];
  }
  
  const teacherUsernames = [];
  
  for (const group of groups) {
    if (group.startsWith("active_student_")) {
      const teacherUsername = group.split("_")[2];
      if (teacherUsername) {
        teacherUsernames.push(teacherUsername);
      }
    }
  }
  
  return teacherUsernames;
}; 

const initialState = {
  eventsByStudent: [],
  selectedEvent: null,
  nextLesson: null,
  teachers: [],
  eventsLoaded: false,
  showModal: false,
  loading: false,
  studentData: null,
  customer: null,
  subscription: null,
  customerLoading: false,
  subscriptionLoading: false,
  customerError: null,
  subscriptionError: null,
  studentDataLoading: false,
  studentDataError: null,
  eventsLoading: false,
  eventsError: null,
};

const studentDashboardSlice = createSlice({
  name: "studentDashboard",
  initialState,
  reducers: {
    setSelectedEvent(state, action) {
      state.selectedEvent = action.payload;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNextLesson(state, action) {
      state.nextLesson = action.payload;
    },
    setTeachers(state, action) {
      state.teachers = action.payload;
    },  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentData.pending, (state) => {
        state.studentDataLoading = true;
      })
      .addCase(fetchStudentData.fulfilled, (state, action) => {
        state.studentDataLoading = false;
        state.studentData = action.payload;
      })
      .addCase(fetchStudentData.rejected, (state, action) => {
        state.studentDataLoading = false;
        state.studentDataError = action.error.message;
      })
      // Student events reducers
      .addCase(fetchStudentEvents.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(fetchStudentEvents.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.eventsByStudent = action.payload;
        state.eventsLoaded = true;

        state.nextLesson = calculateNextLesson(action.payload);
      })
      .addCase(fetchStudentEvents.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.error.message;
      })

      // Customer data reducers
      .addCase(fetchCustomerData.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })
      .addCase(fetchCustomerData.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customer = action.payload;
      })
      .addCase(fetchCustomerData.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = action.error.message;
      })

      // Subscription data reducers
      .addCase(fetchCustomerSubscriptions.pending, (state) => {
        state.subscriptionLoading = true;
        state.subscriptionError = null;
      })
      .addCase(fetchCustomerSubscriptions.fulfilled, (state, action) => {
        state.subscriptionLoading = false;
        state.subscription = action.payload;
      })
      .addCase(fetchCustomerSubscriptions.rejected, (state, action) => {
        state.subscriptionLoading = false;
        state.subscriptionError = action.error.message;
      });
  },
});

export const { setSelectedEvent, setShowModal, setLoading, setNextLesson, setTeachers } =
  studentDashboardSlice.actions;

export const selectEventById = (state, eventId) =>
  state.studentDashboard.eventsByStudent.find((event) => event.id === eventId);

export default studentDashboardSlice.reducer;
