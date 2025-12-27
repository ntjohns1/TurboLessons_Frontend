import React from 'react';
import { FaEdit } from "react-icons/fa";
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setIsUpdate, setFormField } from './StudentSlice';
import { setAccessToken } from '../../../service/axiosConfig';
import { useOktaAuth } from '@okta/okta-react';
import FormField from '../../common/FormField';

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
                    <FormField
                        label="Email"
                        name="email"
                        value={student.email}
                        readOnly={true}
                    />
                    <FormField
                        label="First Name"
                        name="firstName"
                        value={student.firstName}
                        readOnly={true}
                    />
                    <FormField
                        label="Middle Name"
                        name="middleName"
                        value={student.middleName}
                        readOnly={true}
                    />
                    <FormField
                        label="Last Name"
                        name="lastName"
                        value={student.lastName}
                        readOnly={true}
                    />
                    <FormField
                        label="Mobile Phone"
                        name="mobilePhone"
                        value={student.mobilePhone}
                        readOnly={true}
                    />
                    <FormField
                        label="Home Phone"
                        name="primaryPhone"
                        value={student.primaryPhone}
                        readOnly={true}
                    />
                    <FormField
                        label="Address"
                        name="streetAddress"
                        value={student.streetAddress}
                        readOnly={true}
                    />
                    <FormField
                        label="City"
                        name="city"
                        value={student.city}
                        readOnly={true}
                    />
                    <FormField
                        label="State"
                        name="state"
                        value={student.state}
                        readOnly={true}
                    />
                    <FormField
                        label="Zip Code"
                        name="zipCode"
                        value={student.zipCode}
                        readOnly={true}
                    />
                </Form>
            </Card.Body>
        </Card>
    );
}