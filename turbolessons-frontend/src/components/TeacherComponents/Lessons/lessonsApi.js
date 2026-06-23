import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../service/axiosBaseQuery";
import { adjustEvents } from "../../../util/formatters";

/**
 * Lessons server-state, owned by RTK Query. This replaces the fetch/create/
 * update/delete thunks + the eventsByTeacher/eventsLoaded/loading cache that
 * used to live in LessonSlice. Caching, dedupe, loading flags, and
 * refetch-after-mutation are all handled by the cache + tag invalidation.
 *
 * This is the reference pattern to copy for the other features
 * (students, billing, messages, videos, ...).
 */

// Map a server lesson (startTime/endTime) to the calendar event shape (start/end).
const toEvent = ({
  id,
  startTime,
  endTime,
  title,
  student,
  studentEmail,
  teacher,
  teacherEmail,
  date,
  comments,
  billingStatus,
}) => ({
  id,
  start: startTime,
  end: endTime,
  title,
  student,
  studentEmail,
  teacher,
  teacherEmail,
  date,
  comments,
  billingStatus,
});

export const lessonsApi = createApi({
  reducerPath: "lessonsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Lesson"],
  endpoints: (build) => ({
    getTeacherEvents: build.query({
      query: (teacher) => ({ url: `/lessons/teacher/${teacher}` }),
      // Same transform the old thunk did: destructure/map then tz-adjust.
      transformResponse: (response) => adjustEvents(response.map(toEvent)),
      providesTags: (result) =>
        result
          ? [
              ...result.map((e) => ({ type: "Lesson", id: e.id })),
              { type: "Lesson", id: "LIST" },
            ]
          : [{ type: "Lesson", id: "LIST" }],
    }),

    createEvent: build.mutation({
      query: (body) => ({ url: `/lessons`, method: "post", data: body }),
      invalidatesTags: [{ type: "Lesson", id: "LIST" }],
    }),

    updateEvent: build.mutation({
      query: ({ id, formState }) => ({
        url: `/lessons/${id}`,
        method: "put",
        data: formState,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Lesson", id },
        { type: "Lesson", id: "LIST" },
      ],
    }),

    deleteEvent: build.mutation({
      query: (id) => ({ url: `/lessons/${id}`, method: "delete" }),
      invalidatesTags: (result, error, id) => [
        { type: "Lesson", id },
        { type: "Lesson", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTeacherEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = lessonsApi;
