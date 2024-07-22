import React, { useState, useCallback, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useOktaAuth } from '@okta/okta-react';
import LessonModal from './LessonModal'
import { fetchEventsByTeacher } from "../../../service/eventService";
import { setAccessToken } from "../../../service/axiosConfig";


export default function LessonCalendar() {

    const { authState, oktaAuth } = useOktaAuth();
    const principle = authState && authState.idToken && authState.idToken.claims.name;
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [calendarInfo, setCalendarInfo] = useState({});
    const [calendarApi, setCalendarApi] = useState({});
    const [isDateClick, setIsDateClick] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    const handleDateClick = (info) => {
        setIsDateClick(true);
        setSelectedEvent({ startTime: info.date });
        handleShowModal();
    };

    const handleEventClick = (info) => {
        const event = calendarEvents.find(e => e.id === parseInt(info.event.id, 10));
        if (event) {
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
        setCalendarEvents(prevEvents => [...prevEvents, newEvent]);
        handleCloseModal();
    };



    return (
        <Container style={{ height: '90vh' }}>
            <LessonModal
                show={showModal}
                onHide={() => handleCloseModal()}
                onSave={handleSave}
                event={selectedEvent}
                isDateClick={isDateClick}
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
                // weekends={true}
                // select={handleDateSelect}
                dateClick={handleDateClick}
                // eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={eventsCallback} // called after events are initialized/added/changed/removed
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