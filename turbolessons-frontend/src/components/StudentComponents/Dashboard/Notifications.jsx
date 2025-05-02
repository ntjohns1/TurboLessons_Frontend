import React from 'react';
import { Card } from 'react-bootstrap';

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            title: "Lesson Reminder",
            message: "You have a lesson today at 10:00 AM",
        },
        {
            id: 2,
            title: "New Message",
            message: "You have a new message from your teacher",
        }
    ]
    return (
        <Card className="m-2">
            <Card.Body>
                <Card.Title>Notifications</Card.Title>
                {notifications.map((notification, index) => (
                    <Card.Text key={notification.id}>
                        <strong>{notification.title}</strong>
                        <br />
                        {notification.message}
                    </Card.Text>
                ))}
            </Card.Body>
        </Card>
    );
};

export default Notifications;
