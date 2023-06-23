import React, { useState } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { useStudentContext } from '../../util/context/StudentContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewLesson() {
  const { authState, oktaAuth } = useOktaAuth();
  const principleName = authState && authState.idToken && authState.idToken.claims.name;
  const principleEmail = authState && authState.idToken && authState.idToken.claims.email;
  const { students } = useStudentContext();
  const [formState, setFormState] = useState({
    student: '',
    studentEmail: '',
    teacher: principleName,
    teacherEmail: principleEmail,
    date: new Date().toISOString(),
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'student') {
      const selectedStudent = students.find((student) => student.displayName === value);

      setFormState({
        ...formState,
        student: value,
        studentEmail: selectedStudent ? selectedStudent.email : ''
      });
    } else {
      setFormState({
        ...formState,
        [name]: value
      });
    }
  };

  const handleChangeDate = (date) => {
    const formattedDate = date.toISOString();
    setFormState({
      ...formState,
      date: formattedDate
    });
  };

  // submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Request Payload:", JSON.stringify(formState)); // Log the request payload

    const url = "http://localhost:8080/api/lessons";
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
      .then((responseData) => {
        console.log("Response Data:", JSON.stringify(responseData));
        alert('Successfully Added Lesson Event');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <Card className='d-flex justify-content-center'>
        <Form onSubmit={handleSubmit} className="m-3 px-3">
          <Form.Label className='mb-3'>Add New Lesson</Form.Label>
          <Form.Group className="mb-3 px-3" controlId="selectStudent">
            <Form.Select name='student' value={formState.student} onChange={handleChange}>
              <option value=''>Select a Student</option>
              {students && students.map((option) => (
                <option value={option.displayName} key={option.id}>{option.displayName}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 px-3" controlId="date">
            <DatePicker
              showTimeSelect
              selected={new Date(formState.date)}
              onChange={handleChangeDate}
            />
          </Form.Group>
          <Form.Group className="mb-3 px-3" controlId="comments">
            <Form.Label>Add Comments</Form.Label>
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
            Create Lesson
          </Button>
        </Form>
      </Card>
    </ Container>
  )
}
