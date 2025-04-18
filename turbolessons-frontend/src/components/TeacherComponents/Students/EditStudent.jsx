import React, { useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FaRegWindowClose } from "react-icons/fa";
import DeleteUserBtn from './DeleteUserBtn';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent, setFormField, setIsUpdate } from './StudentSlice';
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../../service/axiosConfig';

export default function EditStudent({ student, id }) {
    const dispatch = useDispatch();
    const { oktaAuth } = useOktaAuth();
    const formState = useSelector(state => state.students.formState);

    useEffect(() => {
        // Initialize form with student data
        Object.entries(student).forEach(([field, value]) => {
            dispatch(setFormField({ field, value: value || "" }));
        });
    }, [student, dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch(setFormField({ field: name, value }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            await dispatch(updateStudent({ id, formState })).unwrap();
            alert(`${formState.displayName} successfully updated`);
            dispatch(setIsUpdate(false));
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <Card className="card-user">
            <Card.Header>
                <Row>
                    <Col md='10'>
                        <Card.Title tag="h5">{student.displayName}</Card.Title>
                    </Col>
                    <Col md='2'>
                        <Button
                            className="btn-round ml-3"
                            variant="secondary"
                            onClick={() => dispatch(setIsUpdate(false))}
                        >
                            <FaRegWindowClose />
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">Email</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="email"
                                value={formState.email ?? ""}
                                onChange={handleChange}
                                type="email"
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">First Name</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="firstName"
                                value={formState.firstName ?? ""}
                                onChange={handleChange}
                                type="text"
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">Middle Name</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="middleName"
                                value={formState.middleName ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">Last Name</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="lastName"
                                value={formState.lastName ?? ""}
                                onChange={handleChange}
                                type="text"
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">Mobile Phone</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="mobilePhone"
                                value={formState.mobilePhone ?? ""}
                                onChange={handleChange}
                                type="tel"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">Home Phone</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="primaryPhone"
                                value={formState.primaryPhone ?? ""}
                                onChange={handleChange}
                                type="tel"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">Address</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="streetAddress"
                                value={formState.streetAddress ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">City</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="city"
                                value={formState.city ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">State</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="state"
                                value={formState.state ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">Zip Code</Form.Label>
                        <Col sm="8">
                            <Form.Control
                                name="zipCode"
                                value={formState.zipCode ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                        className='my-2'
                    >
                        Update Student
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer className='p-2 d-flex justify-content-center'>
                <DeleteUserBtn id={id} student={student} />
            </Card.Footer>
        </Card>
    );
}