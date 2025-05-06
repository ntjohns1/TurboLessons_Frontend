import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CreatePaymentMethod = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', e.target);
    };
    return (
        <Card>
            <Card.Title>Create Payment Method</Card.Title>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter card number" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreatePaymentMethod;