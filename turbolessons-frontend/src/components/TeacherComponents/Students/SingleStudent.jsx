import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, CardImg } from 'react-bootstrap';
import EditStudent from './EditStudent';
import StudentInfo from './StudentInfo';
import BillingOverview from '../Billing/BillingOverview';
import { selectIsUpdate } from './StudentSlice';
import { useGetStudentProfileQuery } from './studentsApi';
import LoadingState from '../../common/LoadingState';
import ErrorState from '../../common/ErrorState';
import EmptyState from '../../common/EmptyState';

export default function SingleStudent() {
  const { id } = useParams();

  const {
    data: student,
    isLoading: loading,
    isError,
    error,
  } = useGetStudentProfileQuery(id, { skip: !id });
  const isUpdate = useSelector(selectIsUpdate);

  if (loading) {
    return <LoadingState message="Loading student profile..." />;
  }

  if (isError) {
    return <ErrorState error={error} title="Error loading student profile" />;
  }

  if (!student || Object.keys(student).length === 0) {
    return <EmptyState message="No student found" icon="👤" />;
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
                <BillingOverview />
              </Col>
              <Col md={8}>
                {isUpdate ? (
                  <EditStudent
                    id={id}
                    student={student}
                  />
                ) : (
                  <StudentInfo
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