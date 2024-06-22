import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Row, Col, CardImg, Form, CardGroup } from 'react-bootstrap';
import EditStudent from './EditStudent';
import StudentInfo from './StudentInfo';
import config from '../../../config';
import BillingOverview from '../Billing/BillingOverview';

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
            {/* <Row > */}
            {/* <Col md="11"> */}
            <Row>
                <Col md="4">
                    <Row>
                        <Card className="card-user">
                            <Card.Body >
                                <CardImg
                                    alt="..."
                                    className="avatar border-gray"
                                    src={"https://loremflickr.com/195/135"}
                                />
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">{student.displayName}</Card.Footer>
                        </Card>
                    </Row>
                    <Row>
                        <BillingOverview />
                    </Row>
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
                        <StudentInfo
                            student={student}
                            formState={setFormState}
                            setFormState={setFormState}
                            setIsUpdate={setIsUpdate} />
                    </Col>
                )}
            </Row>
            {/* </Col> */}
            {/* </Row> */}
        </Container >
    )
};