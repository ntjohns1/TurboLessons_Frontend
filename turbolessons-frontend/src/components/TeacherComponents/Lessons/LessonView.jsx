import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { useStudentContext } from '../../../util/context/StudentContext';
import { createLessonEvent } from '../../../service/eventService';
import { setAccessToken } from '../../../service/axiosConfig';
import DatePicker from "react-datepicker";
import config from '../../../config';
import "react-datepicker/dist/react-datepicker.css";

const LessonView = ({ event, handleSave }) => {

    const { isReadOnly, setReadOnly } = useState(true)
    const { authState, oktaAuth } = useOktaAuth();
    const principleName = authState && authState.idToken && authState.idToken.claims.name;
    const principleEmail = authState && authState.idToken.claims.email;
    const { students } = useStudentContext();
    const initialDate = event && event.start ? new Date(event.start) : new Date();
    const initialTime = initialDate;
    const [formState, setFormState] = useState(event || {
        date: initialDate,
        startTime: initialTime,
        endTime: new Date(initialTime.getTime() + 30 * 60000),
        title: '',
        student: '',
        studentEmail: '',
        teacher: principleName,
        teacherEmail: principleEmail,
        comments: '',
        durationOption: '30m', // default duration option
    });

    useEffect(() => {
        if (event && event.start) {
            const parsedDate = new Date(event.start);
            if (!isNaN(parsedDate)) {
                setFormState((prevState) => ({
                    ...prevState,
                    date: parsedDate,
                    startTime: parsedDate,
                    endTime: new Date(parsedDate.getTime() + (prevState.durationOption === '30m' ? 30 : 60) * 60000),
                }));
            } else {
                console.error('Invalid date from event:', event.start);
            }
        }
    }, [event]);



    return (
        <Container>
            <Card className='d-flex justify-content-center'>
                <Form className="m-3 px-3">
                    <Form.Label className='mb-3'>Add New Lesson</Form.Label>
                    <Form.Group className="mb-3 px-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        {isReadOnly ? (
                            <Form.Control
                                type="text"
                                name="title"
                                value={formState.title}
                                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                            />
                        ) : (
                            <Form.Control plaintext readOnly defaultValue={student.email} />
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3 px-3" controlId="selectStudent">
                        <Form.Label>Student</Form.Label>
                        <Form.Select
                            name="student"
                            value={formState.student}
                            onChange={handleStudentChange}
                        >
                            <option value=''>Select a Student</option>
                            {students && students.map((option) => (
                                <option value={option.displayName} key={option.id}>{option.displayName}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 px-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                            className='mx-3 px-3'
                            selected={formState.date}
                            onChange={handleDateChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 px-3" controlId="formStartTime">
                        <Form.Label>Start Time</Form.Label>
                        <DatePicker
                            className='mx-3 px-3'
                            selected={formState.startTime}
                            onChange={handleStartTimeChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 px-3" controlId="formEndTime">
                        <Form.Label>End Time</Form.Label>
                        <DatePicker
                            className='mx-3 px-3'
                            selected={formState.endTime}
                            onChange={handleEndTimeChange}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 px-3" controlId="formDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            as="select"
                            value={formState.durationOption}
                            onChange={handleDurationOptionChange}
                        >
                            <option value="1h">1 hour</option>
                            <option value="30m">30 minutes</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3 px-3" controlId="comments">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                            type="text"
                            name="comments"
                            value={formState.comments}
                            onChange={(e) => setFormState({ ...formState, comments: e.target.value })}
                        />
                    </Form.Group>
                    <Button
                        className="mx-3"
                        variant="success"
                        type="submit"
                        style={{ cursor: 'pointer' }}
                    >
                        Create Lesson
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default LessonView;