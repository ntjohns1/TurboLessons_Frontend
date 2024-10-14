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
    // selectedStudent: null,
    selectedProfile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedProfile(state, action) {
      state.selectedProfile = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeacherStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsByTeacher = action.payload;
      })
      .addCase(fetchTeacherStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createNewStudent.fulfilled, (state, action) => {
        state.studentsByTeacher.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.studentsByTeacher.findIndex(
          (student = student.id === action.payload.id)
        );
        if (index !== -1) {
          state.studentsByTeacher[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.studentsByTeacher = state.studentsByTeacher.filter(
          (student) => student.id !== action.payload
        );
      });
  },
});

export const { setSelectedProfile, setLoading, setStudentFetchFailed } =
  studentSlice.actions;

export const selectStudentById = (state, studentId) =>
    state.students.studentsByTeacher.find((student) => student.id === studentId);

export default studentSlice.reducer;
