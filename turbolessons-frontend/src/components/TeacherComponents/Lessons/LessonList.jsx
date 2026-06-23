import React, { useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useAuth } from '@ntjohns1/react-oidc';
import { useGetTeacherEventsQuery } from './lessonsApi';
import LessonForm from './LessonForm';
import LogLesson from '../Billing/LogLesson';

const LessonList = () => {
    const { claims } = useAuth();
    const teacher = claims.name;

    // Shared RTK Query cache with the calendar (deduped — no double fetch).
    const { data: lessons = [] } = useGetTeacherEventsQuery(teacher, {
        skip: !teacher,
    });

    // Which lesson is being edited is local UI state.
    const [editLesson, setEditLesson] = useState(null);

    const handleEdit = (lesson) => setEditLesson(lesson);
    // Mutations invalidate the Lesson list tag, so the query refetches on save;
    // we just exit edit mode here.
    const handleSave = () => setEditLesson(null);

    return (
        <div style={{ height: '90vh' }}>
            <Card>
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
                                    {[...lessons]
                                        .sort((a, b) => new Date(b.date) - new Date(a.date))
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
                    </Card.Body>
                )}
            </Card>
        </div>
    );
};

export default LessonList;
