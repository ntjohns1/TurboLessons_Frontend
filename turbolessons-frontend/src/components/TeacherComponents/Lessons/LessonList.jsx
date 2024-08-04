import React, { useEffect, useState } from 'react';
import { Card, Toast, Button } from 'react-bootstrap';
import { fetchEventsByTeacher } from '../../../service/eventService';
import LessonForm from './LessonForm';
import { useOktaAuth } from '@okta/okta-react';


const LessonList = () => {
    const [lessons, setLessons] = useState([]);
    const [editLesson, setEditLesson] = useState(null);
    const { authState, oktaAuth } = useOktaAuth();
    const principle = authState && authState.idToken && authState.idToken.claims.name;


    useEffect(() => {
        const loadLessons = async () => {
            try {
                const data = await fetchEventsByTeacher(principle);
                setLessons(data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };

        loadLessons();
    }, []);

    const handleEdit = (lesson) => {
        setEditLesson(lesson);
    };

    const handleSave = () => {
        setEditLesson(null);
        const loadLessons = async () => {
            try {
                const data = await fetchEventsByTeacher(principle);
                setLessons(data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };

        loadLessons();
    };

    return (
        <Card>
            {editLesson ? (
                <LessonForm event={editLesson} handleSave={handleSave}/>
            ) : (
                <Card.Body>
                    {lessons && lessons.map(lesson => (
                        <Toast onClick={() => handleEdit(lesson)} key={lesson.id}>
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">{lesson.title} {lesson.date} {lesson.time}</strong>
                            </Toast.Header>
                        </Toast>
                    ))}
                </ Card.Body>
            )}
        </ Card>
    );
};

export default LessonList;