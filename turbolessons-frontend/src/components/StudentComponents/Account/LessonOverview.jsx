import React from 'react';
import { Card } from 'react-bootstrap';

export default function LessonOverview() {
    const lesson = {
        day: "Monday",
        time: "10:00 AM",
        teacher: "John Doe"
    }
    return (
        <Card>
            <Card.Header>
                <h1>Lesson Overview</h1>
            </Card.Header>
            <Card.Body>
                <Card.Title>Lesson Details</Card.Title>
                <Card.Text>Lesson Day: </Card.Text>
                <Card.Text>Lesson Time: </Card.Text>
                <Card.Text>Lesson Teacher: </Card.Text>
            </Card.Body>
        </Card>
    )
}