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
            <Card.Body>
                <Card.Text>Lesson Day: {lesson.day}</Card.Text>
                <Card.Text>Lesson Time: {lesson.time}</Card.Text>
                <Card.Text>Lesson Teacher: {lesson.teacher}</Card.Text>
            </Card.Body>
        </Card>
    )
}