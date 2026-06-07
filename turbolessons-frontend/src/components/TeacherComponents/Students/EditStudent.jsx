import React, { useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FaRegWindowClose } from "react-icons/fa";
import DeleteUserBtn from './DeleteUserBtn';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent, setFormField, setIsUpdate } from './StudentSlice';
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../../service/axiosConfig';
import FormField from '../../common/FormField';
import { STUDENT_FORM_FIELDS } from '../../../config/studentFormFields';

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
                    {STUDENT_FORM_FIELDS.map((field) => (
                        <FormField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={formState[field.name]}
                            onChange={handleChange}
                            type={field.type}
                            required={field.required || false}
                        />
                    ))}
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