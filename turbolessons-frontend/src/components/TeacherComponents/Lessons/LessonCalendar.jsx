import React, { useState, useCallback, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useOktaAuth } from '@okta/okta-react';
import LessonModal from './LessonModal'
import { fetchAllEvents, fetchEventsByTeacher } from "../../../service/eventService";
import { setAccessToken } from "../../../service/axiosConfig";


export default function LessonCalendar() {

    const { authState, oktaAuth } = useOktaAuth();
    const principle = authState && authState.idToken && authState.idToken.claims.name;
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [calendarInfo, setCalendarInfo] = useState({});
    const [calendarApi, setCalendarApi] = useState({});

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    const handleDateClick = (info) => {
        setSelectedEvent({ date: info.date });
        handleShowModal();
    };

    const handleEventClick = (info) => {
        const event = calendarEvents.find(e => e.id == info.event.id);
        console.log(event);
        if (event) {
            setSelectedEvent(event);
            handleShowModal();
        }
    };

    const eventsCallback = useCallback(async () => {
        try {
            const accessToken = await oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            const data = await fetchEventsByTeacher(principle);
            // Convert event times to local time if necessary
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
    }, [authState, eventsCallback, calendarEvents]);



    return (
        <Container style={{ height: '90vh' }}>
            <LessonModal
                show={showModal}
                onHide={() => handleCloseModal()}
                event={selectedEvent}
                calendarApi={calendarApi}
            />
            <FullCalendar
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
                weekends={weekendsVisible} // Use the state variable directly
                // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                // select={handleDateSelect}
                dateClick={handleDateClick}
                // eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
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