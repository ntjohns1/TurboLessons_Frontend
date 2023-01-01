import React, { useState, useEffect } from 'react';
import { InputGroup, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
import AddMessage from './AddMessage';
import Messages from './Messages';
export default function SelectStudent() {

    const { authState, oktaAuth } = useOktaAuth();
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    // const [userInfo, setUserInfo] = useState(null);

    // const [studentFetchFailed, setStudentFetchFailed] = useState(false);

    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            // setUserInfo(authState.idToken.claims);
            const accessToken = oktaAuth.getAccessToken();
            fetch(config.resourceServer.userAdminUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        // setStudentFetchFailed(true);
                        return Promise.reject();
                    }
                    return response.json();
                })
                .then((data) => {
                    const res = data.map((s) => {
                        return {
                            id: s.id,
                            displayName: s.profile.displayName,
                            email: s.profile.email
                        };
                    });
                    setStudents(res);
                    // setStudentFetchFailed(false);
                })
                .catch((err) => {
                    // setStudentFetchFailed(true);
                    console.error(err);
                });
        }
    }, [authState, oktaAuth]);

    // console.log(userInfo);

    return (
        <>
            <InputGroup>
                <Form.Control
                    as="select"
                    name='selectStudent'
                    value={students.id}
                    onChange={(e) => setStudentId(e.target.value)}
                >
                    <option value=''> Select a Student </option>
                    {students.map((option) => (
                        <option value={option.id} key={option.id}>{option.displayName}</option>
                    ))}
                </Form.Control>
            </InputGroup>
            <Messages studentId={studentId} setStudentId={setStudentId}/>
            {/* <AddMessage studentId={studentId} setStudentId={setStudentId}/> */}
        </>
    )
}