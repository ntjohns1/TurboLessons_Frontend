import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const NotificationSettings = () => {
    return (
        <Card className="m-2 text-center">
            <Card.Title className="mt-2 pt-2">
                Notification Settings
            </Card.Title>
            <Card.Body>
                <Form.Check
                    type="switch"
                    id="lesson-switch"
                    label="Lesson Notifications"
                    checked={true}
                    className="mb-2"
                    onChange={(e) => { }}
                />
                <Form.Check
                    type="switch"
                    id="message-switch"
                    label="Message Notifications"
                    checked={true}
                    className="mb-2"
                    onChange={(e) => { }}
                />
                <Form.Check
                    type="switch"
                    id="billing-switch"
                    label="Billing Notifications"
                    checked={true}
                    className="mb-2"
                    onChange={(e) => { }}
                />
            </Card.Body>
            <Card.Footer>
                <Button
                    onClick={() => { }}
                    variant="primary"
                    disabled
                    size="sm"
                    className="m-2"
                >
                    Edit
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default NotificationSettings;