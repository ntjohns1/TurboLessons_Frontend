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
    console.log(lessonData);

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

const initialState = {
  eventsByTeacher: [],
  selectedEvent: null,
  eventsLoaded: false,
  dateClick: false,
  showModal: false,
  showConfirm: false,
  loading: false,
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
    setLoading(state, action) {
      state.loading = action.payload;
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
        // const initialDate = new Date(event.startTime || new Date());
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsByTeacher = action.payload;
        state.eventsLoaded = true;
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
  setValidated,
  setUpdate,
  setFormField,
  setInitialFormState,
  resetFormState,
} = lessonSlice.actions;

export const selectEventById = (state, eventId) =>
  state.lessons.eventsByTeacher.find((event) => event.id === eventId);

export default lessonSlice.reducer;
