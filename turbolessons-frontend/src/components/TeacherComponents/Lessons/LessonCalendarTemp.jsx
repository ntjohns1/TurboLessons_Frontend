import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import LessonModal from './LessonModal';
import { fetchLessons } from '../../../service/eventService';
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../../service/axiosConfig';

const LessonCalendar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [events, setEvents] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const accessToken = await oktaAuth.getAccessToken();
          setAccessToken(accessToken);
          const data = await fetchLessons();
          setEvents(data.map(lesson => ({
            title: lesson.title,
            start: new Date(lesson.date + 'T' + lesson.time),
            end: new Date(lesson.date + 'T' + lesson.time),
            extendedProps: { student: lesson.student, id: lesson.id },
          })));
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    loadLessons();
  }, [authState, oktaAuth]);

  const handleDateClick = (info) => {
    setModalInfo({
      start: info.dateStr,
      end: info.dateStr,
    });
  };

  const handleEventClick = (info) => {
    setModalInfo({
      id: info.event.extendedProps.id,
      title: info.event.title,
      date: info.event.startStr.split('T')[0],
      time: info.event.startStr.split('T')[1],
      student: info.event.extendedProps.student,
    });
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      {modalInfo && (
        <LessonModal
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
        />
      )}
    </div>
  );
};

export default LessonCalendar;