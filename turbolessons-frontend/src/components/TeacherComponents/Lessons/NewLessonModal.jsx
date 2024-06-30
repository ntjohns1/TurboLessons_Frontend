import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { useStudentContext } from '../../../util/context/StudentContext';
import { createLessonEvent } from '../../../service/eventService';
import { setAccessToken } from '../../../service/axiosConfig';

export default function NewLessonModal({ showModal, handleCloseModal, selectInfo, calendarApi }) {
    const { authState, oktaAuth } = useOktaAuth();
    const principleName = authState && authState.idToken && authState.idToken.claims.name;
    const principleEmail = authState && authState.idToken && authState.idToken.claims.email;
    const { students } = useStudentContext();
    const [formState, setFormState] = useState({
        startTime: '',
        endTime: '',
        title: '',
        student: '',
        studentEmail: '',
        teacher: principleName,
        teacherEmail: principleEmail,
        date: selectInfo.startStr,
        comments: ''
    });

    useEffect(() => {
        console.log(formState);
    }, [formState]);

    // test


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'student') {
            const selectedStudent = students.find((student) => student.displayName === value);

            const startDate = new Date(selectInfo.startStr);
            const endDate = new Date(selectInfo.endStr);
            const start = startDate.toISOString().split('Z')[0];
            const end = endDate.toISOString().split('Z')[0];

            setFormState({
                ...formState,
                startTime: start,
                endTime: end,
                title: value,
                student: value,
                studentEmail: selectedStudent ? selectedStudent.email : ''
            });

            console.log(formState);
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
        try {
            console.log("Request Payload:", JSON.stringify(formState));
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            await createLessonEvent(formState);
            alert('Successfully Added Lesson Event');
        } catch (error) {
            console.error(error);
        }
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
                </Form>
            </Modal.Body>
        </Modal>
    )
}
