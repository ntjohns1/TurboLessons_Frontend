import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Toast, Button } from 'react-bootstrap';
import { useOktaAuth } from '@okta/okta-react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../helpers/Loading';
import '../../../App'
import { fetchTeacherStudents } from './StudentSlice';
import { setAccessToken } from '../../../service/axiosConfig';


export default function StudentTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const students = useSelector((state) => state.students.studentsByTeacher);
    const studentsLoaded = useSelector((state) => state.students.studentsLoaded);
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const principle = authState && authState.idToken && authState.idToken.claims.name;


    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            setAccessToken(accessToken);
            dispatch(fetchTeacherStudents({ teacher: principle }));
        }
    }, [authState, accessToken, principle, studentsLoaded, dispatch])

    function goToStudent(studentId) {
        navigate(`/students/${studentId}`);
    }

    return (
        <div className='d-flex justify-content-center' style={{ height: '90vh' }}>
            {students.length != 0 ? (
                <Card>
                    <Card.Header>
                        <h4>Students</h4>
                    </Card.Header>
                    <Card.Body style={{ overflowY: 'auto' }}>
                        {students && students.map((student) => (
                            <Toast onClick={() => goToStudent(student.id)} key={student.id}>
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">{student.displayName}</strong>
                                </Toast.Header>
                            </Toast>
                        ))}
                    </Card.Body>
                    <Card.Footer>
                        <Button as={Link} to='/addStudent' variant='darkblue'>New Student</Button>
                    </Card.Footer>
                </Card>
            ) : (
                <Loading />
            )}
        </ div>
    )
}