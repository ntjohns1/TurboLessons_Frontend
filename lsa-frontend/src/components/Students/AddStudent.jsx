import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import config from '../../config';

export default function AddStudent() {
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

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const {
            firstName,
            lastName,
            email
        } = formState;
        try {
            await addUser({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                },
            });
            alert("You Did It!");
        } catch (e) {
            console.error(e);
        }
        setFormState({
            firstName: '',
            lastName: '',
            email: '',
        });
    };
    return (
        <Container className='p-4 my-4'>
            <Card>
                <Card.Header>
                    <h4>Add New Student</h4>
                </Card.Header>
                <Card.Body className="p-3">
                    <Form onSubmit={handleFormSubmit} className="mb-3 px-3">
                        <Form.Group className="mb-3 px-3" controlId="firstName">
                            <Form.Label>Student First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formState.firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="studentFirstName">
                            <Form.Label>lastName</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formState.lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="email">
                            <Form.Label>Student Email</Form.Label>
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