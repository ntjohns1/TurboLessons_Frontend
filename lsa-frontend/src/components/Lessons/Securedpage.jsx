
import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Form, Card, Button } from 'react-bootstrap';



const Secured = () => {

  const { authState, oktaAuth } = useOktaAuth();


  // useEffect(() => {
  //   if (authState && authState.isAuthenticated) {
  //     accessToken = oktaAuth.getAccessToken();
  //   }
  // }, [authState, oktaAuth]);


  const [formState, setFormState] = useState({
    studentId: '6967f66b-8a23-4549-bb5e-0b6612fd4f5a',
    date: '2023-09-16T13:00:00.000000',
    comments: 'This is a test LessonEvent'
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/api/lesson";
    const accessToken = oktaAuth.getAccessToken();
    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState),
    })
      .then(response => {
        if (response.status === 200 || response.status === 204) {
          return response.json();
        }
        return Promise.reject('Didn\'t receive expected status: 201');
      })
      .then(() => {
        alert('Successfully Added Lesson Event');
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };
  if (authState && authState.isAuthenticated) {
    return (
      <Container>
        <Card>
          <Card.Header>
            <h4>Add New Student</h4>
          </Card.Header>
          <Card.Body className="p-3">
            <Form onSubmit={handleFormSubmit} className="mb-3 px-3">
              <Form.Group className="mx-3 px-3" controlId="studentId">
                <Form.Label>studentId</Form.Label>
                <Form.Control
                  type="text"
                  name="studentId"
                  value={formState.studentId}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 px-3" controlId="date">
                <Form.Label>date</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  value={formState.date}
                  onChange={handleChange}

                />
              </Form.Group>
              <Form.Group className="mb-3 px-3" controlId="studentFirstName">
                <Form.Label>comments</Form.Label>
                <Form.Control
                  type="text"
                  name="comments"
                  value={formState.comments}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                className="mx-3"
                variant="success"
                type="submit"
                style={{ cursor: 'pointer' }}
              >
                Add Student
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    )
  }
};

export default Secured;