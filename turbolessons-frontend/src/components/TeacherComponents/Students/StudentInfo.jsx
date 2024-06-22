import React, { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { Button, Card, Col, Form, Row } from 'react-bootstrap';


export default function StudentInfo({ student, setFormState, setIsUpdate }) {

    useEffect(() => {
        setFormState({
            ...student,
        })
    }, []);
    
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
                            onClick={() => setIsUpdate(true)}
                        >
                            <FaEdit />
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Email
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.email} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            First Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.firstName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextFName">
                        <Form.Label column sm="4">
                            Middle Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.middleName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextLastName">
                        <Form.Label column sm="4">
                            Last Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.lastName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextMName">
                        <Form.Label column sm="4">
                            Mobile Phone
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.mobilePhone} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Home Phone
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.primaryPhone} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Address
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.streetAddress} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            City
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.city} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            State
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.state} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Zip Code
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={student.zipCode} />
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
};