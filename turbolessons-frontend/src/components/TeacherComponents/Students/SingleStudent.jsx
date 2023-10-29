import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import EditStudent from './EditStudent';
import StudentList from './StudentList';
import config from '../../../config';

export default function SingleStudent() {
    const { authState, oktaAuth } = useOktaAuth();
    const [isUpdate, setIsUpdate] = useState(false);

    const id = useParams().id;

    const [student, setStudent] = useState({});

    useEffect(() => {
        const accessToken = oktaAuth.getAccessToken();

        fetch(`${config.resourceServer.userAdminUrl}/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => response.json())
            .then(result =>
                setStudent(result))
            .catch(console.log)
    }, []);
    const [formState, setFormState] = useState({
        ...student,
    });
    useEffect(() => {
        setFormState({
            ...student,
        })
    }, []);

    return (
        <Container>
            <Row >
                <Col md="11">
                    <Row className='m-3'>
                        <Col md="4">
                            <Card className="card-user">
                                <Card.Body>
                                    <div className="author">
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={"http://placecorgi.com/260/180"}
                                        />
                                        <h5 className="title">{student.displayName}</h5>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        {isUpdate ? (
                            <Col md="8">
                                <EditStudent
                                    id={id}
                                    student={student}
                                    setStudent={setStudent}
                                    formState={formState}
                                    setFormState={setFormState}
                                    setIsUpdate={setIsUpdate}
                                    oktaAuth={oktaAuth}
                                />
                            </Col>

                        ) : (
                            <Col md="8">
                                <StudentList
                                    student={student}
                                    formState={setFormState}
                                    setFormState={setFormState}
                                    setIsUpdate={setIsUpdate} />
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container >
    )
};