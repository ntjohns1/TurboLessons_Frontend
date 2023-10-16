import React from 'react';
import { Container, Card, Toast, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStudentContext } from '../../../util/context/StudentContext';
import Loading from '../../../helpers/Loading';


export default function StudentTable() {
    // populate table with list of students
    const { students, studentFetchFailed } = useStudentContext();
    
    function goToStudent(studentId) {
        document.location.replace(`/students/${studentId}`);
    }

    return (
        <Container className='d-flex justify-content-center'>
            {studentFetchFailed && <Alert>Failed to fetch student</Alert>}
            {students.length != 0 ? (
                <Card>
                    <Card.Header>
                        <h4>Students</h4>
                    </Card.Header>
                    <Card.Body style={{ height: '65vh', overflowY: 'auto' }}>
                        {students && students.map((student) => (
                            <Toast onClick={() => goToStudent(student.id)} key={student.id}>
                                <Toast.Header closeButton={false}>
                                    <strong className="me-auto">{student.displayName}</strong>
                                </Toast.Header>
                            </Toast>
                        ))}
                    </Card.Body>
                    <Card.Footer>
                        <Button as={Link} to='/addStudent' >New Student</Button>
                    </Card.Footer>
                </Card>
            ) : (
                <Loading />
            )}
        </Container>
    )
}