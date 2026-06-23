import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@ntjohns1/react-oidc";
import {
  useGetTeacherEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "./lessonsApi";
import { setSelectedEvent, setDateClick, setShowModal } from "./LessonSlice";

/**
 * Feature facade for the lesson calendar.
 * - Server state (events + mutations) comes from RTK Query (lessonsApi).
 * - Client/UI state (modal open, selection, dateClick) comes from LessonSlice.
 * No useEffect, no manual loading flag, no setAccessToken: the query fetches on
 * mount, caches, and refetches automatically after mutations invalidate tags.
 */
export default function useLessonCalendar() {
  const { claims } = useAuth();
  const teacher = claims.name;
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.lessons.showModal);

  // Server state. `skip` avoids firing until we know the teacher.
  const {
    data: events = [],
    isLoading,
    isError,
  } = useGetTeacherEventsQuery(teacher, { skip: !teacher });

  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const handleCloseModal = () => dispatch(setShowModal(false));
  const handleShowModal = () => dispatch(setShowModal(true));

  // FullCalendar wants Date objects; the query returns ISO strings.
  const calendarEvents = useMemo(
    () =>
      events.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
      })),
    [events]
  );

  const handleDateClick = (arg) => {
    let utcDate = new Date(Date.parse(arg.dateStr + "T00:00:00Z"));
    utcDate.setUTCHours(12, 0, 0, 0);
    utcDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    const startTime = utcDate.toISOString();
    const endDate = new Date(utcDate);
    endDate.setUTCMinutes(endDate.getUTCMinutes() + 30);
    const endTime = endDate.toISOString();
    dispatch(setSelectedEvent({ start: startTime, end: endTime }));
    dispatch(setDateClick(true));
    dispatch(setShowModal(true));
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === parseInt(info.event.id, 10));
    if (event) {
      dispatch(setDateClick(false));
      dispatch(setSelectedEvent(event));
      handleShowModal();
    }
  };

  const handleEventAdd = (addInfo) =>
    createEvent({
      ...addInfo,
      start: new Date(addInfo.startTime),
      end: new Date(addInfo.endTime),
    });

  const handleEventChange = (id, changeInfo) =>
    updateEvent({
      id,
      formState: {
        ...changeInfo,
        start: new Date(changeInfo.startTime),
        end: new Date(changeInfo.endTime),
      },
    });

  const handleEventRemove = (removeInfo) => deleteEvent(removeInfo.event.id);

  return {
    events: calendarEvents,
    isLoading,
    isError,
    showModal,
    handleShowModal,
    handleCloseModal,
    handleDateClick,
    handleEventClick,
    handleEventAdd,
    handleEventChange,
    handleEventRemove,
  };
}
