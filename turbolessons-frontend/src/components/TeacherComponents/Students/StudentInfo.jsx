import React from 'react';
import { FaEdit } from "react-icons/fa";
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setIsUpdate, setFormField } from './StudentSlice';
import { setAccessToken } from '../../../service/axiosConfig';
import { useOktaAuth } from '@okta/okta-react';

export default function StudentInfo({ student }) {
    const dispatch = useDispatch();
    const { oktaAuth } = useOktaAuth();

    const handleEdit = () => {
        // Initialize form state with current student data
        Object.entries(student).forEach(([field, value]) => {
            dispatch(setFormField({ field, value: value || "" }));
        });
        dispatch(setIsUpdate(true));
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
                            onClick={handleEdit}
                        >
                            <FaEdit />
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">Email</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.email || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">First Name</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.firstName || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">Middle Name</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.middleName || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">Last Name</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.lastName || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">Mobile Phone</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.mobilePhone || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">Home Phone</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.primaryPhone || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">Address</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.streetAddress || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">City</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.city || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">State</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.state || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="4">Zip Code</Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly value={student.zipCode || ''} />
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}