import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getStudentProfile,
} from "../../../service/adminService";

// Thunks
export const fetchStudentProfile = createAsyncThunk(
  "profile/fetchStudentProfile",
  async ({ id }) => {
    const response = await getStudentProfile(id);
    return response;
  }
);

export const updateStudent = createAsyncThunk(
  "profile/updateStudent",
  async ({ id, formState }) => {
    const response = editStudent(id, formState);
    return response;
  }
);

// Slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    formState: {
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
    },
    isUpdate: false,
    studentProfile: {},
    loading: false,
    error: null,
  },
  reducers: {
    setStudentProfile(state, action) {
      state.studentProfile = action.payload;
    },
    setFormField(state, action) {
      const { field, value } = action.payload;
      state.formState[field] = value;
    },
    setIsUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    resetFormState(state) {
      state.formState = {
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentProfile = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
});

export const {
  setStudentProfile,
  setFormField,
  setIsUpdate,
  setLoading,
  resetFormState,
} = profileSlice.actions;

// Selectors
export const selectStudentsByTeacher = (state) => state.profile.studentsByTeacher;
export const selectStudentProfile = (state) => state.profile.studentProfile;
export const selectIsUpdate = (state) => state.profile.isUpdate;
export const selectLoading = (state) => state.profile.loading;
export const selectError = (state) => state.profile.error;
export const selectFormState = (state) => state.profile.formState;
export const selectStudentsLoaded = (state) => state.profile.studentsLoaded;
export const selectStudentById = (state, studentId) =>
  state.profile.studentsByTeacher.find((student) => student.id === studentId);

export default profileSlice.reducer;
