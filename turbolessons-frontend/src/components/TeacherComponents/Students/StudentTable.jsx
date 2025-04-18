import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Toast, Button } from 'react-bootstrap';
import { useOktaAuth } from '@okta/okta-react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../helpers/Loading';
import '../../../App';
import { 
    fetchTeacherStudents, 
    selectStudentsByTeacher,
    selectStudentsLoaded,
    selectLoading,
    selectError 
} from './StudentSlice';
import { setAccessToken } from '../../../service/axiosConfig';

export default function StudentTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authState, oktaAuth } = useOktaAuth();
    
    // Redux selectors
    const students = useSelector(selectStudentsByTeacher);
    const studentsLoaded = useSelector(selectStudentsLoaded);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    
    const principle = authState?.idToken?.claims?.name;

    useEffect(() => {
        if (authState?.isAuthenticated && principle && !studentsLoaded) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchTeacherStudents({ teacher: principle }));
        }
    }, [authState, principle, studentsLoaded, dispatch]);

    const goToStudent = (studentId) => {
        navigate(`/students/${studentId}`);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error loading students: {error.message}
            </div>
        );
    }

    if (!students || students.length === 0) {
        return (
            <div className='d-flex justify-content-center' style={{ height: '90vh' }}>
                <Card>
                    <Card.Header>
                        <h4>Students</h4>
                    </Card.Header>
                    <Card.Body className="text-center">
                        <p>No students found.</p>
                    </Card.Body>
                    <Card.Footer>
                        <Button as={Link} to='/addStudent' variant='darkblue'>New Student</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }

    return (
        <div className='d-flex justify-content-center' style={{ height: '90vh' }}>
            <Card>
                <Card.Header>
                    <h4>Students</h4>
                </Card.Header>
                <Card.Body style={{ overflowY: 'auto' }}>
                    {students.map((student) => (
                        <Toast 
                            onClick={() => goToStudent(student.id)} 
                            key={student.id}
                            role="button"
                            className="student-toast"
                        >
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
        </div>
    );
}