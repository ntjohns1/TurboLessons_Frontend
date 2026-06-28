import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../service/axiosBaseQuery";

/**
 * Students/admin server-state, owned by RTK Query. Talks to admin-service via
 * the gateway (/api/users...). Replaces the fetch/create/edit/delete thunks +
 * studentsByTeacher/studentProfile/loading cache that lived in StudentSlice.
 *
 * Same reference pattern as lessonsApi.
 */
export const studentsApi = createApi({
  reducerPath: "studentsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Student", "StudentProfile"],
  endpoints: (build) => ({
    // Teacher's roster — lightweight projection for the list view.
    getStudentsByTeacher: build.query({
      query: (teacher) => ({ url: `/users/teacher/${teacher}` }),
      transformResponse: (response) =>
        response.map((s) => ({
          id: s.id,
          displayName: s.profile.displayName,
          email: s.profile.email,
        })),
      providesTags: (result) =>
        result
          ? [
              ...result.map((s) => ({ type: "Student", id: s.id })),
              { type: "Student", id: "LIST" },
            ]
          : [{ type: "Student", id: "LIST" }],
    }),

    // Full profile for a single user (admin-service /users/profile/:id).
    getStudentProfile: build.query({
      query: (id) => ({ url: `/users/profile/${id}` }),
      providesTags: (result, error, id) => [{ type: "StudentProfile", id }],
    }),

    // Raw user record (admin-service /users/:id).
    getUser: build.query({
      query: (id) => ({ url: `/users/${id}` }),
      providesTags: (result, error, id) => [{ type: "StudentProfile", id }],
    }),

    createStudent: build.mutation({
      query: (formState) => ({ url: `/users`, method: "post", data: formState }),
      invalidatesTags: [{ type: "Student", id: "LIST" }],
    }),

    editStudent: build.mutation({
      query: ({ id, formState }) => ({
        url: `/users/${id}`,
        method: "put",
        data: formState,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Student", id },
        { type: "Student", id: "LIST" },
        { type: "StudentProfile", id },
      ],
    }),

    deleteStudent: build.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "delete" }),
      invalidatesTags: (result, error, id) => [
        { type: "Student", id },
        { type: "Student", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetStudentsByTeacherQuery,
  useGetStudentProfileQuery,
  useGetUserQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
