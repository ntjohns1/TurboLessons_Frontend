import React from 'react';
import { Container, Card, Toast, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStudentContext } from '../../../util/context/StudentContext';
import Loading from '../../../helpers/Loading';
import '../../../App'


export default function StudentTable() {
    // populate table with list of students
    const { students, studentFetchFailed } = useStudentContext();
    
    function goToStudent(studentId) {
        document.location.replace(`/students/${studentId}`);
    }

    return (
        <div className='d-flex justify-content-center' style={{ height:'90vh' }}>
            {studentFetchFailed && <Alert>Failed to fetch student</Alert>}
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