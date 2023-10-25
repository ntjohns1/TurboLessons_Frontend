import React, { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { useStudentContext } from '../../../util/context/StudentContext';
import config from '../../../config';

export default function NewLessonModal({ showModal, handleCloseModal, selectInfo, calendarApi }) {
    const { authState, oktaAuth } = useOktaAuth();
    const principleName = authState && authState.idToken && authState.idToken.claims.name;
    const principleEmail = authState && authState.idToken && authState.idToken.claims.email;
    const { students } = useStudentContext();
    const [formState, setFormState] = useState({
        startTime: selectInfo.startStr,
        endTime: selectInfo.endStr,
        title: '',
        student: '',
        studentEmail: '',
        teacher: principleName,
        teacherEmail: principleEmail,
        date: selectInfo.startStr,
        comments: ''
    });
    console.log(calendarApi);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'student') {
            const selectedStudent = students.find((student) => student.displayName === value);

            setFormState({
                ...formState,
                student: value,
                studentEmail: selectedStudent ? selectedStudent.email : ''
            });
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        }
    };

    // submit form
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Request Payload:", JSON.stringify(formState)); // Log the request payload

        const accessToken = oktaAuth.getAccessToken();
        await fetch(config.resourceServer.eventsUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState),
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    return response.json();
                }
                return Promise.reject('Didn\'t receive expected status');
            })
            .then((responseData) => {
                console.log("Response Data:", JSON.stringify(responseData));
                calendarApi.addEvent({
                    title: formState.title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                })
                calendarApi.unselect() // clear date selection
                handleCloseModal()
                alert('Successfully Added Lesson Event');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Modal
            show={showModal}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>New Lesson</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="m-3 px-3">
                    <Form.Group className="mb-3 px-3" controlId="selectStudent">
                        <Form.Select name='student' value={formState.student} onChange={handleChange}>
                            <option value=''>Select a Student</option>
                            {students && students.map((option) => (
                                <option value={option.displayName} key={option.id}>{option.displayName}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 px-3" controlId="comments">
                        <Form.Label>Add Comments</Form.Label>
                        <Form.Control
                            type="text"
                            name="comments"
                            value={formState.comments}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button
                    className="mx-3"
                    type="submit"
                    style={{ cursor: 'pointer' }}
                >
                    Create Lesson
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
