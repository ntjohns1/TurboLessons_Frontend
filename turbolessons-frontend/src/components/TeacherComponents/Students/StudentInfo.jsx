import React from 'react';
import { FaEdit } from "react-icons/fa";
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setIsUpdate, setFormField } from './StudentSlice';
import { setAccessToken } from '../../../service/axiosConfig';
import { useOktaAuth } from '@okta/okta-react';
import FormField from '../../common/FormField';
import { STUDENT_FORM_FIELDS } from '../../../config/studentFormFields';

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
                    {STUDENT_FORM_FIELDS.map((field) => (
                        <FormField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={student[field.name]}
                            readOnly={true}
                        />
                    ))}
                </Form>
            </Card.Body>
        </Card>
    );
}