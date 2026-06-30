import React from 'react'
import { Container } from 'react-bootstrap'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import LessonModal from './LessonModal'
import useLessonCalendar from './useLessonCalendar';

export default function LessonCalendar() {

    const {
        events,
        showModal,
        handleShowModal,
        handleCloseModal,
        handleDateClick,
        handleEventClick,
        handleEventAdd,
        handleEventChange,
        handleEventRemove
    } = useLessonCalendar();

    return (
        <Container style={{ height: '90vh' }}>
            <LessonModal
                show={showModal}
                onHide={() => handleCloseModal()}
                onCreate={handleEventAdd}
                onUpdate={handleEventChange}
                onDelete={handleEventRemove}
            />
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
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
                eventChange={handleEventChange}
                eventRemove={handleEventRemove}
                timeZone="local"

            />
        </Container>
    )
}