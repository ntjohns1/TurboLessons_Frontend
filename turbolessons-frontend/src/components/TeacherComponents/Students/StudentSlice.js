import { createSlice } from "@reduxjs/toolkit";

/**
 * Client/UI state for the students feature: the add/edit form and edit-mode
 * toggle. Server state (roster, profile, CRUD) now lives in studentsApi
 * (RTK Query) — see studentsApi.js. This slice no longer fetches or caches.
 */

const emptyForm = {
  city: "",
  displayName: "",
  email: "",
  firstName: "",
  lastName: "",
  login: "",
  middleName: "",
  mobilePhone: "",
  primaryPhone: "",
  state: "",
  streetAddress: "",
  userType: "",
  zipCode: "",
};

const studentSlice = createSlice({
  name: "students",
  initialState: {
    formState: { ...emptyForm },
    isUpdate: false,
  },
  reducers: {
    setFormField(state, action) {
      const { field, value } = action.payload;
      state.formState[field] = value;
    },
    setIsUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    resetFormState(state) {
      state.formState = { ...emptyForm };
    },
  },
});

export const { setFormField, setIsUpdate, resetFormState } =
  studentSlice.actions;

// UI selectors
export const selectIsUpdate = (state) => state.students.isUpdate;
export const selectFormState = (state) => state.students.formState;

export default studentSlice.reducer;
