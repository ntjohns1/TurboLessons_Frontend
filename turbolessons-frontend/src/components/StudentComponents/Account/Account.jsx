import React from 'react';
import { Card, Container, Row, Col, CardImg } from 'react-bootstrap';
import EditProfile from './EditProfile';
import ProfileDetail from './ProfileDetail';  

export default function Account() {
  const isUpdate = false;
  const student = {
    displayName: "John Doe",
    email: "john.doe@example.com",
    firstName: "John",
    middleName: "Doe",
    lastName: "Doe", 
    mobilePhone: "123-456-7890",
    primaryPhone: "123-456-7890",
    streetAddress: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  }

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
                      alt={student.displayName}
                      className="avatar border-gray"
                      src={"https://loremflickr.com/195/135"}
                    />
                  </Card.Body>
                  <Card.Footer className="text-center">
                    {student.displayName}
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={8}>
                {isUpdate ? (
                  <EditProfile
                    id={id}
                    student={student}
                  />
                ) : (
                  <ProfileDetail
                    student={student}
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