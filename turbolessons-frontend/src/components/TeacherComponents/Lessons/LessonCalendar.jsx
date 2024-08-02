import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useOktaAuth } from '@okta/okta-react';
import LessonModal from './LessonModal'
import {
    fetchTeacherEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    setSelectedEvent,
    setDateClick,
    setShowModal,
    setShowConfirm,
    setLoading
} from './LessonSlice';
import { setAccessToken } from "../../../service/axiosConfig";

export default function LessonCalendar() {

    const calendarRef = useRef(null)
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const dispatch = useDispatch();
    const eventsByTeacher = useSelector((state) => state.lessons.eventsByTeacher);
    // const loading = useSelector((state) => state.lessons.loading);
    const selectedEvent = useSelector((state) => state.lessons.selectedEvent);
    const showModal = useSelector((state) => state.lessons.showModal);
    const dateClick = useSelector((state) => state.lessons.dateClick);
    const handleCloseModal = () => {
        dispatch(setShowModal(false));
    };

    const handleShowModal = () => {
        dispatch(setShowModal(true));
    };

    useEffect(() => {
        if (authState.isAuthenticated) {
            const teacher = authState.idToken.claims.name;
            setAccessToken(accessToken);
            dispatch(fetchTeacherEvents({ teacher }));
        }
    }, [handleCloseModal]);

    useEffect(() => {
        if (authState.isAuthenticated) {
            const teacher = authState.idToken.claims.name;
            setAccessToken(accessToken);
            dispatch(fetchTeacherEvents({ teacher }));
        }
    }, [authState, dispatch]);


    const events = useCallback(() => {
        return eventsByTeacher.map(event => ({
            id: event.id,
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
        }));
    }, [eventsByTeacher]);

    const handleDateClick = (info) => {
        // dispatch(setDateClick(true));
        // dispatch(setSelectedEvent({ start: new Date(info.date) }));
        console.log(info.date);
        handleShowModal();
    };

    const handleEventClick = (info) => {
        const event = eventsByTeacher.find(e => e.id === parseInt(info.event.id, 10));
        if (event) {
            dispatch(setDateClick(false));
            dispatch(setSelectedEvent(event));
            handleShowModal();
        }
    };

    const handleEventAdd = (addInfo) => {
        dispatch(createEvent({
            ...addInfo,
            start: new Date(addInfo.startTime),
            end: new Date(addInfo.endTime)
        }));
    };

    const handleEventChange = (id, changeInfo) => {
        console.log(changeInfo);
        dispatch(updateEvent({
            id,
            formState: {
                ...changeInfo,
                start: new Date(changeInfo.startTime),
                end: new Date(changeInfo.endTime)
            }
        }));
    };

    const handleEventRemove = (removeInfo) => {
        const event = removeInfo.event;
        dispatch(deleteEvent(event.id));
    };


    return (
        <Container style={{ height: '90vh' }}>
            <LessonModal
                show={showModal}
                onHide={() => handleCloseModal()}
                isDateClick={dateClick}
                event={selectedEvent}
                onCreate={handleEventAdd}
                onUpdate={handleEventChange}
                onDelete={handleEventRemove}
            />
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events()}
                initialView='dayGridMonth'
                height={'90vh'}
                contentHeight={800}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                // eventContent={renderEventContent} // custom render function
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventAdd={handleEventAdd}
                eventChange={handleEventChange} // called after events are initialized/added/changed/removed
                eventRemove={handleEventRemove}
                timeZone="local"

            />
        </Container>
    )
}