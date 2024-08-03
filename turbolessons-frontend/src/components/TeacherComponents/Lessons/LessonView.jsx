import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LessonConfirm from './LessonConfirm';
import { useSelector, useDispatch } from 'react-redux';
import { setShowConfirm } from './LessonSlice';

const LessonView = ({ event, setUpdate }) => {
    const dispatch = useDispatch();
    const showConfirm = useSelector((state) => state.lessons.showConfirm);
    const handleShowConfirm = () => dispatch(setShowConfirm(true));
    const parseDate = (dateString) => {
        return new Date(dateString);
    };

    return (
        <Container>
            {!showConfirm ? (
                <Card className='d-flex justify-content-center'>
                    <Form className="m-3 px-3">
                        <Form.Group className="mb-3 px-3" controlId="selectStudent">
                            <Form.Label>Student</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={event?.student} />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="date">
                            <Form.Label>Date</Form.Label>
                            <DatePicker
                                className='mx-3 px-3'
                                selected={parseDate(event?.start)}
                                readOnly
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="formStartTime">
                            <Form.Label>Start Time</Form.Label>
                            <DatePicker
                                className='mx-3 px-3'
                                selected={parseDate(event?.start)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                readOnly
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="formEndTime">
                            <Form.Label>End Time</Form.Label>
                            <DatePicker
                                className='mx-3 px-3'
                                selected={parseDate(event?.end)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                disabled
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 px-3" controlId="comments">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={event?.comments} />
                        </Form.Group>
                    </Form>
                    <Card.Footer className='d-flex'>
                        <Button
                            className="mx-3"
                            variant="secondary"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setUpdate(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="mx-3"
                            variant="danger"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleShowConfirm()}
                        >
                            Delete
                        </Button>
                    </Card.Footer>
                </Card>
            ) : (
                <LessonConfirm
                    show={showConfirm}
                    eventId={event.id}
                />
            )}
        </Container>
    );
};

export default LessonView;