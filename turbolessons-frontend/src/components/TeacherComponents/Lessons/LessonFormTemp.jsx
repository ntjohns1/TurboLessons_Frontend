import React, { useState } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { useStudentContext } from '../../../util/context/StudentContext';
import { createLessonEvent } from '../../../service/eventService';
import { setAccessToken } from '../../../service/axiosConfig';
import DatePicker from "react-datepicker";
import config from '../../../config';
import "react-datepicker/dist/react-datepicker.css";

const LessonForm = ({ selectInfo }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const principleName = authState && authState.idToken && authState.idToken.claims.name;
  const principleEmail = authState && authState.idToken && authState.idToken.claims.email;
  const { students } = useStudentContext();
  const [formState, setFormState] = useState({
    startTime: '',
    endTime: '',
    title: '',
    student: '',
    studentEmail: '',
    teacher: principleName,
    teacherEmail: principleEmail,
    durationOption: '1h' // default duration option
  });

  const handleStartTimeChange = (date) => {
    setFormState((prevState) => {
      const endTime = new Date(date.getTime() + (prevState.durationOption === '30m' ? 30 : 60) * 60000);
      return { ...prevState, startTime: date, endTime };
    });
  };

  const handleDurationOptionChange = (e) => {
    const newDuration = e.target.value;
    setFormState((prevState) => {
      const endTime = new Date(prevState.startTime.getTime() + (newDuration === '30m' ? 30 : 60) * 60000);
      return { ...prevState, durationOption: newDuration, endTime };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await oktaAuth.getAccessToken();
    setAccessToken(token);
    await createLessonEvent(formState);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 px-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3 px-3" controlId="formStudent">
              <Form.Label>Student</Form.Label>
              <Form.Control
                as="select"
                value={formState.student}
                onChange={(e) => setFormState({ ...formState, student: e.target.value })}
              >
                {students.map((student) => (
                  <option key={student.id} value={student.name}>{student.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 px-3" controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <DatePicker
                selected={formState.startTime}
                onChange={handleStartTimeChange}
                showTimeSelect
                dateFormat="Pp"
              />
            </Form.Group>
            <Form.Group className="mb-3 px-3" controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <DatePicker
                selected={formState.endTime}
                onChange={(date) => setFormState({ ...formState, endTime: date })}
                showTimeSelect
                dateFormat="Pp"
              />
            </Form.Group>
            <Form.Group className="mb-3 px-3" controlId="formDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                as="select"
                value={formState.durationOption}
                onChange={handleDurationOptionChange}
              >
                <option value="1h">1 hour</option>
                <option value="30m">30 minutes</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonForm;