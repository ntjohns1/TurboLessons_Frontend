import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table, Toast, Button } from 'react-bootstrap';
import { fetchEventsByTeacher } from '../../../service/eventService';
import LessonForm from './LessonForm';
import LogLesson from '../Billing/LogLesson';
import { useOktaAuth } from '@okta/okta-react';


const LessonList = () => {
    // const [lessons, setLessons] = useState([]);
    // const [editLesson, setEditLesson] = useState(null);
    const { authState, oktaAuth } = useOktaAuth();
    const principle = authState && authState.idToken && authState.idToken.claims.name;
    const dispatch = useDispatch();
    const editLesson = useSelector((state) => state.lessons.isUpdate);
    const setEditLesson = (lesson) => dispatch({ type: 'lessons/setEditLesson', payload: lesson });
    const lessons = useSelector((state) => state.lessons.eventsByTeacher);


    useEffect(() => {
        const loadLessons = async () => {
            try {
                const data = await fetchEventsByTeacher(principle);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };
        if (!lessons.length) {
            loadLessons();
        }
    }, []);

    const handleEdit = (lesson) => {
        setEditLesson(lesson);
    };

    const handleSave = () => {
        setEditLesson(null);
        const loadLessons = async () => {
            try {
                const data = await fetchEventsByTeacher(principle);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };
        loadLessons();
    };

    return (
        <div style={{ height: '90vh' }}>
            <Card >
                {editLesson ? (
                    <LessonForm event={editLesson} handleSave={handleSave} />
                ) : (
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '70vh' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Title</th>
                                        <th>Log Lesson</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lessons &&
                                        [...lessons]
                                            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sorting by date
                                            .map((lesson) => (
                                                <tr onClick={() => handleEdit(lesson)} key={lesson.id}>
                                                    <td>{lesson.date}</td>
                                                    <td>{lesson.title}</td>
                                                    <td><LogLesson /></td>
                                                </tr>
                                            ))}
                                </tbody>
                            </Table>
                        </div>
                    </ Card.Body>
                )}
            </ Card>
        </div>
    );
};

export default LessonList;