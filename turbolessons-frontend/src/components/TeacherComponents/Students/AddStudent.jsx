import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFormField, resetFormState } from './StudentSlice';
import { useCreateStudentMutation } from './studentsApi';
import { useNavigate } from 'react-router-dom';
import { STUDENT_FORM_FIELDS } from '../../../config/studentFormFields';

// Todo: assign student to teacher when created
export default function AddStudent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formState = useSelector(state => state.students.formState);
    const [createStudent] = useCreateStudentMutation();

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch(setFormField({ field: name, value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await createStudent(formState).unwrap();
            alert(`Successfully Added Account for: ${formState.firstName} ${formState.lastName}`);
            dispatch(resetFormState());
            navigate('/teacher_portal/students');
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
                        {STUDENT_FORM_FIELDS.filter(field => field.required).map((field) => (
                            <Form.Group key={field.name} className="mb-3 px-3" controlId={field.name}>
                                <Form.Label>{field.label}</Form.Label>
                                <Form.Control
                                    type={field.type}
                                    name={field.name}
                                    value={formState[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            </Form.Group>
                        ))}
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