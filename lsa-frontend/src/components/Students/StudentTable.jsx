import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container } from 'react-bootstrap';
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
                    const res = data.map((s) => {
                        return {
                            displayName: s.displayName,
                            email: s.email
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
    return (
        <Container>
            <h3 className='text-center'>Welcome to Student Management!</h3>
            <h4 className='my-4 text-center'>View Current Students</h4>
            <div className='p-4 my-4 d-flex justify-content-center'>
                <div>
                    {students && students.map((student) => (
                        <StudentList students={student} key={student.email} />
                    ))}
                </div>
            </div>
        </Container>
    )
}