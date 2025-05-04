import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../../service/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudentEvents } from './StudentDashboardSlice';
import { formatFullDate, formatTime } from '../../../util/formatters';

export default function NextLessonWidget() {
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();
    
    // Get student name from auth state
    const student = authState?.idToken?.claims?.name;
    
    // Get data from Redux store
    const nextLesson = useSelector((state) => state.studentDashboard?.nextLesson);
    const loading = useSelector((state) => state.studentDashboard?.loading || false);

    // Fetch student events when component mounts
    useEffect(() => {
        if (authState?.isAuthenticated && student) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchStudentEvents({ student }));
        }
    }, [authState?.isAuthenticated, oktaAuth, dispatch, student]);

    return (
        <Card className="m-2"> 
            <Card.Body>
                <Card.Title>Next Lesson</Card.Title>
                {loading ? (
                    <Card.Text>Loading lessons...</Card.Text>
                ) : nextLesson ? (
                    <>
                        <Card.Text>Day: {formatFullDate(nextLesson.startTime || nextLesson.start)}</Card.Text>
                        <Card.Text>Time: {formatTime(nextLesson.startTime || nextLesson.start)} - {formatTime(nextLesson.endTime || nextLesson.end)}</Card.Text>
                        <Card.Text>Teacher: {nextLesson.teacher || 'Not specified'}</Card.Text>
                    </>
                ) : (
                    <Card.Text>No upcoming lessons scheduled</Card.Text>
                )}
            </Card.Body>
        </Card>
    )
}