import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createNewStudent, setFormField, resetFormState } from './StudentSlice';
import { useNavigate } from 'react-router-dom';

// Todo: assign student to teacher when created
export default function AddStudent() {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formState = useSelector(state => state.students.formState);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch(setFormField({ field: name, value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (authState && authState.isAuthenticated) {
                const accessToken = await oktaAuth.getAccessToken();
                await dispatch(createNewStudent(formState)).unwrap();
                alert(`Successfully Added Account for: ${formState.firstName} ${formState.lastName}`);
                dispatch(resetFormState());
                navigate('/students');
            }
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    return (
        <Container className='d-flex justify-content-center my-3'>
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
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formState.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 px-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
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