import { createSlice } from "@reduxjs/toolkit";

/**
 * Client/UI state for the lessons feature: modal visibility, the current
 * selection, and the lesson form. Server state (the events list + CRUD) now
 * lives in lessonsApi (RTK Query) — see lessonsApi.js. This slice no longer
 * fetches or caches lessons.
 */

const initialState = {
  selectedEvent: null,
  dateClick: false,
  showModal: false,
  showConfirm: false,
  validated: false,
  isUpdate: false,
  formState: {
    date: new Date().toISOString(),
    startTime: new Date().toISOString(),
    endTime: new Date(new Date().getTime() + 30 * 60000).toISOString(),
    title: "",
    student: "",
    studentEmail: "",
    teacher: "",
    teacherEmail: "",
    comments: "",
    durationOption: "30m",
    billingStatus: "UNLOGGED",
  },
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
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
    setValidated(state, action) {
      state.validated = action.payload;
    },
    setUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    setFormField(state, action) {
      const { field, value } = action.payload;

      if (field === "date") {
        const newDate = new Date(value);
        const currentStartTime = new Date(state.formState.startTime);
        const currentEndTime = new Date(state.formState.endTime);

        // Update the date part of startTime and endTime
        state.formState.startTime = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
          currentStartTime.getHours(),
          currentStartTime.getMinutes()
        ).toISOString();

        state.formState.endTime = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
          currentEndTime.getHours(),
          currentEndTime.getMinutes()
        ).toISOString();

        // Update the formState date
        state.formState.date = value;
      } else if (field === "startTime") {
        const newStartTime = new Date(value);
        const durationMinutes =
          state.formState.durationOption === "30m" ? 30 : 60;

        // Update startTime and calculate new endTime
        state.formState.startTime = newStartTime.toISOString();
        state.formState.endTime = new Date(
          newStartTime.getTime() + durationMinutes * 60000
        ).toISOString();
      } else if (field === "durationOption") {
        const durationMinutes = value === "30m" ? 30 : 60;
        const currentStartTime = new Date(state.formState.startTime);

        // Update durationOption and calculate new endTime
        state.formState.durationOption = value;
        state.formState.endTime = new Date(
          currentStartTime.getTime() + durationMinutes * 60000
        ).toISOString();
      } else {
        // Default update for other fields
        state.formState[field] = value;
      }
    },
    setInitialFormState(state, action) {
      const { event, teacherName, teacherEmail } = action.payload;
      if (event) {
        const initialStartTime = new Date(event.startTime || new Date());
        const durationMinutes = event.durationOption === "1h" ? 60 : 30;
        state.formState = {
          date: initialStartTime.toISOString(),
          startTime: initialStartTime.toISOString(),
          endTime: new Date(initialStartTime.getTime() + durationMinutes * 60000).toISOString(),
          title: event.student || "",
          student: event.student || "",
          studentEmail: event.studentEmail || "",
          teacher: teacherName || "",
          teacherEmail: teacherEmail || "",
          comments: event.comments || "",
          durationOption: event.durationOption || "30m",
          billingStatus: "UNLOGGED",
        };
      } else {
        state.formState = {
          ...initialState.formState,
        };
      }
    },
    resetFormState(state) {
      state.formState = { ...initialState.formState };
    },
  },
});

export const {
  setSelectedEvent,
  setDateClick,
  setShowModal,
  setShowConfirm,
  setValidated,
  setUpdate,
  setFormField,
  setInitialFormState,
  resetFormState,
} = lessonSlice.actions;

export default lessonSlice.reducer;
