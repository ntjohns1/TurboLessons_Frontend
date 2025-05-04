import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEventsByStudent } from "../../../service/eventService";
import { searchCustomerByOktaId, getSubscription } from "../../../service/billingService";
import { adjustEvents } from "../../../util/formatters";

// Thunks
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

  // Return the first (earliest) upcoming lesson
  return upcomingLessons[0];
};

const initialState = {
  eventsByStudent: [],
  selectedEvent: null,
  nextLesson: null,
  eventsLoaded: false,
  showModal: false,
  loading: false,
  customer: null,
  subscription: null,
  customerLoading: false,
  subscriptionLoading: false,
  customerError: null,
  subscriptionError: null
};

const lessonSlice = createSlice({
  name: "lessons",
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
  },
  extraReducers: (builder) => {
    builder
      // Student events reducers
      .addCase(fetchStudentEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsByStudent = action.payload;
        state.eventsLoaded = true;

        // Calculate and set the next lesson
        state.nextLesson = calculateNextLesson(action.payload);
      })
      .addCase(fetchStudentEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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

export const { setSelectedEvent, setShowModal, setLoading, setNextLesson } =
  lessonSlice.actions;

export const selectEventById = (state, eventId) =>
  state.lessons.eventsByStudent.find((event) => event.id === eventId);

export default lessonSlice.reducer;
