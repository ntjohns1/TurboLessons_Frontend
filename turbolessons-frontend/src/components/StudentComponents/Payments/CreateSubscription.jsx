import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const CreateSubscription = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };
    return (
        <Card>
            <Card.Title>Create Subscription</Card.Title>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
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

export default CreateSubscription;  