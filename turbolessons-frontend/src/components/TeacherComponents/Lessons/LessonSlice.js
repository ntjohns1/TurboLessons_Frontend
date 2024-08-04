import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEventsByTeacher,
  createLessonEvent,
  editLessonEvent,
  deleteLessonEvent,
} from "../../../service/eventService";

const adjustEvents = (events) => {
  return events.map((event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return {
      ...event,
      start: new Date(
        start.getTime() - start.getTimezoneOffset() * 60000
      ).toISOString(),
      end: new Date(
        end.getTime() - end.getTimezoneOffset() * 60000
      ).toISOString(),
    };
  });
};

// Thunks
export const fetchTeacherEvents = createAsyncThunk(
  "lessons/fetchTeacherEvents",
  async ({ teacher }) => {
    const plainEventObjects = await fetchEventsByTeacher(teacher);
    const adjustedEvents = adjustEvents(plainEventObjects);
    return adjustedEvents;
  }
);

export const createEvent = createAsyncThunk(
  "lessons/createEvent",
  async (lessonData) => {
    const response = await createLessonEvent(lessonData);
    return response;
  }
);

export const updateEvent = createAsyncThunk(
  "lessons/updateEvent",
  async ({ id, formState }) => {
    // Ensure dates are in ISO string format before sending to the API
    const response = await editLessonEvent(id, formState);
    return response;
  }
);

export const deleteEvent = createAsyncThunk(
  "lessons/deleteEvent",
  async (id) => {
    const response = await deleteLessonEvent(id);
    return response;
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    eventsByTeacher: [],
    selectedEvent: null,
    dateClick: false,
    showModal: false,
    showConfirm: false,
    loading: false,
    validated: false
  },
  reducers: {
    setSelectedEvent(state, action) {
      state.selectedEvent = action.payload;
    },
    setDateClick(state, action) {
      state.dateClick = action.payload;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setShowConfirm(state, action) {
      state.showConfirm = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setValidated(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsByTeacher = action.payload;
      })
      .addCase(fetchTeacherEvents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventsByTeacher.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.eventsByTeacher.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.eventsByTeacher[index] = action.payload;
        }
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.eventsByTeacher = state.eventsByTeacher.filter(
          (event) => event.id !== action.payload
        );
      });
  },
});

export const {
  setSelectedEvent,
  setDateClick,
  setShowModal,
  setShowConfirm,
  setLoading,
  setValidated
} = lessonSlice.actions;

export const selectEventById = (state, eventId) =>
  state.lessons.eventsByTeacher.find((event) => event.id === eventId);

export default lessonSlice.reducer;
