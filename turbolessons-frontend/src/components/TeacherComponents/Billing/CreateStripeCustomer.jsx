import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCustomerThunk, updateCustomerFormState, resetCustomerFormState } from "./BillingSlice";
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';

const CreateStripeCustomer = () => {
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();

    // Local state for success feedback
    const [successMessage, setSuccessMessage] = useState("");

    // Select the customer form state from Redux
    const customerFormState = useSelector((state) => state.billing.customerFormState) || {
        name: "",
        email: "",
        phone: "",
        address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
        },
        description: "",
    };

    const studentProfile = useSelector((state) => state.students.studentProfile);
    const id = useParams().id;

    useEffect(() => {
        if (studentProfile) {
            dispatch(resetCustomerFormState());

            const initialState = {
                name: `${studentProfile.firstName} ${studentProfile.lastName}` || "",
                email: studentProfile.email || "",
                phone: studentProfile.mobilePhone || "",
                address: {
                    line1: studentProfile.streetAddress || "",
                    line2: "",
                    city: studentProfile.city || "",
                    state: studentProfile.state || "",
                    postalCode: studentProfile.zipCode || "",
                    country: "US",
                },
                defaultPaymentMethod: "",
                description: "",
                metadata: { 'okta_id': id },
                subscriptions: [],
            };

            Object.entries(initialState).forEach(([field, value]) => {
                if (typeof value === "object" && value !== null) {
                    Object.entries(value).forEach(([subField, subValue]) => {
                        dispatch(updateCustomerFormState({ field: `${field}.${subField}`, value: subValue }));
                    });
                } else {
                    dispatch(updateCustomerFormState({ field, value }));
                }
            });
        }
    }, [studentProfile, dispatch]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateCustomerFormState({ field: name, value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authState && authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            const actionResult = dispatch(createCustomerThunk(customerFormState));
            if (createCustomerThunk.fulfilled.match(actionResult)) {
                setSuccessMessage("Customer created successfully!");
            }
        }
    };

    return (
        <Card>
            <Card.Header>Create New Customer</Card.Header>
            <Card.Body>
                {successMessage && (
                    <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
                        {successMessage}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={customerFormState.name || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={customerFormState.email || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={customerFormState.phone || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Label>Address</Form.Label>
                    <Row>
                        <Col>
                            <Form.Group controlId="address.line1">
                                <Form.Label>Line 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.line1"
                                    value={customerFormState.address?.line1 || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="address.line2">
                                <Form.Label>Line 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.line2"
                                    value={customerFormState.address?.line2 || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="address.city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.city"
                                    value={customerFormState.address?.city || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="address.state">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.state"
                                    value={customerFormState.address?.state || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="address.postalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.postalCode"
                                    value={customerFormState.address?.postalCode || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="address.country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.country"
                                    value={customerFormState.address?.country || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={customerFormState.description || ""}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create Customer
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateStripeCustomer;