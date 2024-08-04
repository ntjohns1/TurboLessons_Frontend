import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { createStudent } from '../../../service/adminService';
import { setAccessToken } from '../../../service/axiosConfig';

// Todo: assign student to teacher when created
export default function AddStudent() {
    const { authState, oktaAuth } = useOktaAuth();
    // form input to add student
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });


    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (authState && authState.isAuthenticated) {
                const accessToken = await oktaAuth.getAccessToken();
                setAccessToken(accessToken);
                await createStudent(formState);
                alert(`Successfully Added Account for: ${formState.firstName} ${formState.lastName}`);
                goBack();
            }
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };
    function goBack() {
        document.location.replace(`/students`);
    }
    return (
        <Container className='d-flex justify-content-center'>
            <Card>
                <Card.Header>
                    <h4>Add New Student</h4>
                </Card.Header>
                <Card.Body className="p-3">
                    <Form onSubmit={handleFormSubmit} className="mb-3 px-3">
                        <Form.Group className="mb-3 px-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formState.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="studentFirstName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formState.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button
                            className="mx-3"
                            variant="success"
                            type="submit"
                            style={{ cursor: 'pointer' }}
                        >
                            Add Student
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}