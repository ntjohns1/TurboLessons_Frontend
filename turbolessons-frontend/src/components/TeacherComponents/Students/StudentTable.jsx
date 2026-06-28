import React from 'react';
import { Card, Toast, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../common/LoadingSpinner';
import '../../../App';
import useStudentData from './useStudentData';

export default function StudentTable() {
    const navigate = useNavigate();
    const { students, isLoading, isError, error } = useStudentData();

    const goToStudent = (studentId) => {
        navigate(`/teacher_portal/students/${studentId}`);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return (
            <div className="alert alert-danger" role="alert">
                Error loading students: {error?.data?.message || error?.data || 'Unknown error'}
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
                        <Button as={Link} to='/teacher_portal/addStudent' variant='darkblue'>New Student</Button>
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
                    <Button as={Link} to='/teacher_portal/addStudent' variant='darkblue'>New Student</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}
