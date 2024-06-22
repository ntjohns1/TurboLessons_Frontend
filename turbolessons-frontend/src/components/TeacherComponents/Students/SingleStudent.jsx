import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Row, Col, CardImg } from 'react-bootstrap';
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
      .then((response) => response.json())
      .then((result) => setStudent(result))
      .catch(console.log);
  }, [id, oktaAuth]);

  const [formState, setFormState] = useState({
    ...student,
  });

  useEffect(() => {
    setFormState({
      ...student,
    });
  }, [student]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card className="p-3">
            <Row>
              <Col md={4}>
                <Card className='mb-3'>
                  <Card.Body className="d-flex justify-content-center align-items-center">
                    <CardImg
                      alt="..."
                      className="avatar border-gray"
                      src={"https://loremflickr.com/195/135"}
                    />
                  </Card.Body>
                  <Card.Footer className="text-center">
                    {student.displayName}
                  </Card.Footer>
                </Card>
                <BillingOverview />
              </Col>
              <Col md={8}>
                {isUpdate ? (
                  <EditStudent
                    id={id}
                    student={student}
                    setStudent={setStudent}
                    formState={formState}
                    setFormState={setFormState}
                    setIsUpdate={setIsUpdate}
                    oktaAuth={oktaAuth}
                  />
                ) : (
                  <StudentInfo
                    student={student}
                    formState={setFormState}
                    setFormState={setFormState}
                    setIsUpdate={setIsUpdate}
                  />
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}