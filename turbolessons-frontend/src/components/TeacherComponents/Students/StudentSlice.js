import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getStudentProfile,
  getStudentsByTeacher,
} from "../../../service/adminService";

// Thunks
export const fetchTeacherStudents = createAsyncThunk(
  "students/fetchTeacherStudents",
  async ({ teacher }) => {
    const response = await getStudentsByTeacher(teacher);
    return response;
  }
);

export const fetchStudentProfile = createAsyncThunk(
  "students/fetchStudentProfile",
  async ({ id }) => {
    const response = await getStudentProfile(id);
    return response;
  }
);

export const createNewStudent = createAsyncThunk(
  "students/createNewStudent",
  async (studentData) => {
    const response = await createStudent(studentData);
    return response;
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, formState }) => {
    const response = editStudent(id, formState);
    return response;
  }
);

export const removeStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    const response = await deleteStudent(id);
    return response;
  }
);

// Slice
const studentSlice = createSlice({
  name: "students",
  initialState: {
    studentsByTeacher: [],
    studentsLoaded: false,
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
      .addCase(fetchTeacherStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsByTeacher = action.payload;
        state.studentsLoaded = true;
      })
      .addCase(fetchTeacherStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
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
      .addCase(createNewStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsByTeacher.push(action.payload);
      })
      .addCase(createNewStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.studentsByTeacher.findIndex(
          (student) => student.id === action.payload.id
        );
        if (index !== -1) {
          state.studentsByTeacher[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(removeStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsByTeacher = state.studentsByTeacher.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(removeStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {
  setStudentProfile,
  setFormField,
  setIsUpdate,
  setLoading,
  resetFormState,
} = studentSlice.actions;

// Selectors
export const selectStudentsByTeacher = (state) => state.students.studentsByTeacher;
export const selectStudentProfile = (state) => state.students.studentProfile;
export const selectIsUpdate = (state) => state.students.isUpdate;
export const selectLoading = (state) => state.students.loading;
export const selectError = (state) => state.students.error;
export const selectFormState = (state) => state.students.formState;
export const selectStudentsLoaded = (state) => state.students.studentsLoaded;
export const selectStudentById = (state, studentId) =>
  state.students.studentsByTeacher.find((student) => student.id === studentId);

export default studentSlice.reducer;
