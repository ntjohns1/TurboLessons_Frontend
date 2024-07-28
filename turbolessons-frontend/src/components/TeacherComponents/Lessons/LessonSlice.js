import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  loading: false,
};

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Add other reducers here
  },
});

export const { setEvents, setLoading } = lessonSlice.actions;

export default lessonSlice.reducer;