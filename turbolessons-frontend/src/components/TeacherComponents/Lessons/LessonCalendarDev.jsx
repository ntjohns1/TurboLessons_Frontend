import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useOktaAuth } from '@okta/okta-react';
import LessonModal from './LessonModal'
import { fetchEventsByTeacher } from "../../../service/eventService";
import { setAccessToken } from "../../../service/axiosConfig";

/*  TODO: State management should interact with Fullcalendar API, currently just using our own objects

Refactor Create Event Objects
Refactor Read Event Objects
Refactor Update Event Objects
Refactor Delete Event Objects

*/
export default function LessonCalendar() {

    const calendarRef = useRef(null)
    const { authState, oktaAuth } = useOktaAuth();
    const principle = authState && authState.idToken && authState.idToken.claims.name;
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDateClick, setIsDateClick] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    const handleDateClick = (info) => {
        setIsDateClick(true);
        setSelectedEvent({ start: info.date });
        handleShowModal();
    };

    const handleEventClick = (info) => {
        const event = calendarEvents.find(e => e.id === parseInt(info.event.id, 10));
        if (event) {
            console.log(info.event.id);
            setIsDateClick(false);
            setSelectedEvent(event);
            handleShowModal();
        }
    };

    const eventsCallback = useCallback(async () => {
        try {
            const accessToken = await oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            const data = await fetchEventsByTeacher(principle);


            const adjustedEvents = data.map(event => {
                const start = new Date(event.start);
                const end = new Date(event.end);
                return {
                    ...event,
                    start: new Date(start.getTime() - (start.getTimezoneOffset() * 60000)),
                    end: new Date(end.getTime() - (end.getTimezoneOffset() * 60000)),
                };
            });
            setCalendarEvents(adjustedEvents);
            return adjustedEvents;
        } catch (error) {
            console.error(error);
            return [];
        }
    }, [oktaAuth, principle]);

    useEffect(() => {
        if (authState?.isAuthenticated) {
            eventsCallback();
        }
    }, [authState, eventsCallback]);

    const handleSave = async (newEvent) => {
        setCalendarEvents(prevEvents => {
          const existingEventIndex = prevEvents.findIndex(event => event.id === newEvent.id);
          if (existingEventIndex !== -1) {
            const updatedEvents = [...prevEvents];
            updatedEvents[existingEventIndex] = newEvent;
            return updatedEvents;
          } else {
            return [...prevEvents, newEvent];
          }
        });
      };
    
      const handleEventsChange = async (info) => {
        const updatedEvents = await eventsCallback();
        setCalendarEvents(updatedEvents);
      };


    return (
        <Container style={{ height: '90vh' }}>
            <LessonModal
                show={showModal}
                onHide={() => handleCloseModal()}
                onSave={handleSave}
                event={selectedEvent}
                isDateClick={isDateClick}
                />
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={eventsCallback}
                initialView='dayGridMonth'
                height={'90vh'}
                contentHeight={800}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                // weekends={true}
                // select={handleDateSelect}
                dateClick={handleDateClick}
                // eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                // eventChange={eventsCallback} // called after events are initialized/added/changed/removed
                timeZone="local"

            />
        </Container>
    )
}


// const handleWeekendsToggle = () => {
//     setWeekendsVisible(!weekendsVisible);
// }

// const handleDateSelect = (info) => {

//     // setCalendarInfo(info);
//     setCalendarApi(info.view.calendar)
//     setSelectedEvent({
//         start: info.dateStr,
//         end: info.dateStr,
//     });
//     handleShowModal();
// }
// // const handleSelectEvent = (event) => {
// //     setSelectedEvent(event);
// //     setShowModal()
// // };

// const handleEvents = (events) => {
//     // setCalendarEvents(events)
// }

// const handleEventClick = (info) => {
//     setSelectedEvent({
//       id: info.event.extendedProps.id,
//       title: info.event.title,
//       date: info.event.startStr.split('T')[0],
//       time: info.event.startStr.split('T')[1],
//       student: info.event.extendedProps.student,
//     });
//     handleShowModal()
//   };