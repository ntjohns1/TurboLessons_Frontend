import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Form, Row, Col, InputGroup, Card, Toast } from 'react-bootstrap';

import config from '../../config';
import StudentList from './StudentList';

export default function StudentTable() {
    // populate table with list of students
    const { authState, oktaAuth } = useOktaAuth();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            fetch(config.resourceServer.userAdminUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        return Promise.reject();
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    const res = data.map((s) => {
                        return {
                            id: s.id,
                            displayName: s.profile.displayName,
                            email: s.profile.email
                        };
                    });
                    setStudents(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [authState, oktaAuth]);

    console.log(students);

    function goToStudent(studentId) {
        document.location.replace(`/students/${studentId}`);
    }

    return (
        <Container className='d-flex justify-content-center'>
            <Card>
                <Card.Header>
                    <h4>Students</h4>
                </Card.Header>
                {students && students.map((student) => (
                    <Toast onClick={() => goToStudent(student.id)} key={student.id}>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">{student.displayName}</strong>
                        </Toast.Header>
                    </Toast>
                ))}
            </Card>
        </Container>
    )
}