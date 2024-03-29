import React, { useState, useCallback } from 'react'
import { Container } from 'react-bootstrap'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useOktaAuth } from '@okta/okta-react';
import config from '../../../config'
import NewLessonModal from './NewLessonModal'

export default function Calendar() {

    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const principle = authState && authState.idToken && authState.idToken.claims.name;
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [calendarInfo, setCalendarInfo] = useState({});
    const [calendarApi, setCalendarApi]  = useState({});

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible);
    }

    const handleDateSelect = (selectInfo) => {

        setCalendarApi(selectInfo.view.calendar)
        setCalendarInfo(selectInfo);
        handleShowModal();
    }

    const handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    const handleEvents = (events) => {
        // setCurrentEvents(events)
    }

    const fetchEvents = useCallback((info) => {
        return new Promise((resolve, reject) => {
            if (authState && authState.isAuthenticated) {
                const url = `${config.resourceServer.eventsUrl}/teacher/${principle}`;
                console.log(url);
                fetch(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const events = data.map(s => ({
                            id: s.id,
                            start: s.startTime,
                            end: s.endTime,
                            title: s.title,
                        }));
                        setCurrentEvents(events);
                        resolve(events);
                        console.log("events: \n" + JSON.stringify(events, null, 2));
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                reject(new Error('User is not authenticated.'));
            }
        });
    }, [authState, accessToken, principle]);


    return (
        <Container style={{ height: '90vh' }}>
            <NewLessonModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                selectInfo={calendarInfo}
                calendarApi={calendarApi}
            />
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={fetchEvents}
                initialView='dayGridMonth'
                height={'90vh'}
                contentHeight={800}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible} // Use the state variable directly
                // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                // eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            />
        </Container>
    )
}
