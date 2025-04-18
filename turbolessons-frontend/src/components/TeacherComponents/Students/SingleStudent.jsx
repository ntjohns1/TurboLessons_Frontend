import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Row, Col, CardImg } from 'react-bootstrap';
import EditStudent from './EditStudent';
import StudentInfo from './StudentInfo';
import BillingOverview from '../Billing/BillingOverview';
import { 
  fetchStudentProfile, 
  selectStudentProfile,
  selectIsUpdate,
  setIsUpdate,
  selectLoading,
  selectError 
} from './StudentSlice';
import { setAccessToken } from '../../../service/axiosConfig';

export default function SingleStudent() {
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();
  const { id } = useParams();
  
  const student = useSelector(selectStudentProfile);
  const isUpdate = useSelector(selectIsUpdate);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (authState.isAuthenticated && id) {
      const accessToken = oktaAuth.getAccessToken();
      setAccessToken(accessToken);
      dispatch(fetchStudentProfile({ id }));
    }
  }, [authState, id, dispatch]);

  if (loading) {
    return <div>Loading student profile...</div>;
  }

  if (error) {
    return <div>Error loading student profile: {error.message}</div>;
  }

  if (!student || Object.keys(student).length === 0) {
    return <div>No student found</div>;
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