import React from 'react';
import { Card } from 'react-bootstrap';

export default function LessonOverview() {
    const lesson = {
        day: "Monday",
        time: "10:00 AM",
        teacher: "John Doe"
    }
    return (
        <Card className="m-2"> 
            <Card.Body>
                <Card.Title>Lesson Overview</Card.Title>
                <Card.Text>Day: {lesson.day}</Card.Text>
                <Card.Text>Time: {lesson.time}</Card.Text>
                <Card.Text>Teacher: {lesson.teacher}</Card.Text>
            </Card.Body>
        </Card>
    )
}