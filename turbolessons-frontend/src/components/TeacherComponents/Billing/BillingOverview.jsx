/*
    - Requirements:
        - Viewing current subscription status and details.
        - Updating subscription plans.
        - Viewing billing history.
        - Adding or updating payment methods.
        - Handling payment processing and errors.


*/

import React from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStudentContext } from '../../../util/context/StudentContext';
import Loading from '../../../helpers/Loading';
import '../../../App'

export default function BillingOverview() {
    return (
        <Card>
            <Card.Header>Billing Details</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            Status
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={"Active"} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            Last Bill Date
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control plaintext readOnly defaultValue={"06/01"} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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
                <Button as={Link} to='/addStudent' variant='darkblue'>Manage Billing</Button>
            </Card.Footer>
        </Card>
    )
}