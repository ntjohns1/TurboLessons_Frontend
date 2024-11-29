/*
    - Requirements:
        - Viewing current subscription status and details.
        - Updating subscription plans.
        - Viewing billing history.
        - Adding or updating payment methods.
        - Handling payment processing and errors.


*/

import React, { useEffect } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useStudentContext } from '../../../util/context/StudentContext';
import Loading from '../../../helpers/Loading';
import '../../../App'
import { setAccessToken } from "../../../service/axiosConfig";
import { useOktaAuth } from '@okta/okta-react';

export default function BillingOverview() {
    // requirement: function to lookup customerId from okta_id
    // Fetch customer data by ID
    // If no data, render a button linking to NewSubscriptionForm.jsx
    // If data exists, 
    const paramsId = useParams().id;

    return (
        <Card>
            <Card.Header>Billing Details</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            Status
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={"Active"} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            Last Bill Date
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={"06/01"} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            Active Since
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={"06/01"} />
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button as={Link} to={`/students/${paramsId}/billing`} variant='darkblue'>Manage Billing</Button>
            </Card.Footer>
        </Card>
    )
}