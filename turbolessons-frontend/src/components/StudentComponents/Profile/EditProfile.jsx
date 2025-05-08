import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FaRegWindowClose } from "react-icons/fa";
import DeleteUserBtn from './DeleteUserBtn';

export default function EditProfile({ student, id }) {

    const handleChange = (event) => {
        const { name, value } = event.target;
        student[name] = value;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(student);
    }

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
                            onClick={() => {}}
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
                                value={student.email ?? ""}
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
                                value={student.firstName ?? ""}
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
                                value={student.middleName ?? ""}
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
                                value={student.lastName ?? ""}
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
                                value={student.mobilePhone ?? ""}
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
                                value={student.primaryPhone ?? ""}
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
                                value={student.streetAddress ?? ""}
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
                                value={student.city ?? ""}
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
                                value={student.state ?? ""}
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
                                value={student.zipCode ?? ""}
                                onChange={handleChange}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer className='p-2 d-flex justify-content-center'>
                    <Button
                        type='submit'
                        variant='primary'
                        className='my-2'
                    >
                        Update Profile
                    </Button>
            </Card.Footer>
        </Card>
    );
}