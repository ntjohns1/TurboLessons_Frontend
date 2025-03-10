import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../../service/axiosConfig';
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux';
import { setValidated, setFormField, setInitialFormState, setUpdate } from './LessonSlice';
import { parseISO, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const LessonForm = ({ onHide, onCreate, onUpdate }) => {

  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();

  const rawFormState = useSelector((state) => state.lessons.formState);

  const formState = useMemo(() => ({
    ...rawFormState,
    date: parseISO(rawFormState.date),
    startTime: parseISO(rawFormState.startTime),
    endTime: parseISO(rawFormState.endTime),
  }), [rawFormState]);
  const selectedEvent = useSelector((state) => state.lessons.selectedEvent);
  const dateClick = useSelector((state) => state.lessons.dateClick);
  const isValidated = useSelector((state) => state.lessons.validated);
  const students = useSelector((state) => state.students.studentsByTeacher);


  // useEffect(() => {
  //   if (event && event.startTime) {
  //     const parsedDate = new Date(event.startTime);
  //     if (!isNaN(parsedDate)) {
  //       setFormState((prevState) => ({
  //         ...prevState,
  //         date: parsedDate,
  //         startTime: parsedDate,
  //         endTime: new Date(parsedDate.getTime() + (prevState.durationOption === '30m' ? 30 : 60) * 60000),
  //       }));
  //     } else {
  //       console.error('Invalid date from event:', event.startTime);
  //     }
  //   }
  // }, [event]);

  useEffect(() => {
    const teacherName = authState && authState.idToken && authState.idToken.claims.name;
    const teacherEmail = authState && authState.idToken.claims.email;
    dispatch(setInitialFormState({ event: selectedEvent, teacherName, teacherEmail }));
  }, [selectedEvent, authState, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setUpdate(false));
    };
  }, [setUpdate]);

  const handleDateChange = (date) => {
    console.log(date);
    
    dispatch(setFormField({ field: 'date', value: date.toISOString() }));
  };

  // const handleDateChange = (date) => {
  //   setFormState((prevState) => {
  //     const startTime = new Date(date);
  //     startTime.setHours(prevState.startTime.getHours(), prevState.startTime.getMinutes());

  //     const endTime = new Date(date);
  //     endTime.setHours(prevState.endTime.getHours(), prevState.endTime.getMinutes());

  //     return { ...prevState, date, startTime, endTime };
  //   });
  // };


  const handleStartTimeChange = (time) => {
    dispatch(setFormField({ field: 'startTime', value: time.toISOString() }));
    const endTime = new Date(time.getTime() + (formState.durationOption === '30m' ? 30 : 60) * 60000);
    dispatch(setFormField({ field: 'endTime', value: endTime.toISOString() }));
  };

  // const handleStartTimeChange = (time) => {
  //   setFormState((prevState) => {
  //     const endTime = new Date(time.getTime() + (prevState.durationOption === '30m' ? 30 : 60) * 60000);
  //     return { ...prevState, startTime: time, endTime };
  //   });
  // };

  const handleDurationOptionChange = (e) => {
    const durationOption = e.target.value;
    dispatch(setFormField({ field: 'durationOption', value: durationOption }));
    const endTime = new Date(formState.startTime.getTime() + (durationOption === '30m' ? 30 : 60) * 60000);
    dispatch(setFormField({ field: 'endTime', value: endTime.toISOString() }));
  };

  // const handleDurationOptionChange = (e) => {
  //   const newDuration = e.target.value;
  //   setFormState((prevState) => {
  //     const endTime = new Date(prevState.startTime.getTime() + (newDuration === '30m' ? 30 : 60) * 60000);
  //     return { ...prevState, durationOption: newDuration, endTime };
  //   });
  // };

  const handleStudentChange = (e) => {
    const selectedStudent = students.find((student) => student.displayName === e.target.value);
    dispatch(setFormField({ field: 'student', value: e.target.value }));
    dispatch(setFormField({ field: 'studentEmail', value: selectedStudent?.email || '' }));
    dispatch(setFormField({ field: 'title', value: e.target.value }));
  };

  // const handleStudentChange = (e) => {
  //   const selectedStudent = students.find((student) => student.displayName === e.target.value);
  //   setFormState({
  //     ...formState,
  //     student: e.target.value,
  //     studentEmail: selectedStudent ? selectedStudent.email : '',
  //     title: e.target.value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      dispatch(setValidated(false));
    } else {
      dispatch(setValidated(true));
      try {
        const accessToken = await oktaAuth.getAccessToken();
        setAccessToken(accessToken);
        if (!dateClick) {
          onUpdate(selectedEvent.id, formState);
          onHide();
          alert('Successfully Edited Lesson Event');
        } else {
          onCreate(formState);
          onHide();
          alert('Successfully Added Lesson Event');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <Container>
      <Card className='d-flex justify-content-center'>
        <Form onSubmit={handleSubmit} noValidate validated={isValidated} className="m-3 px-3">
          <Form.Group className="mb-3 px-3" controlId="selectStudent">
            <Form.Label>Student</Form.Label>
            <Form.Select
              name="student"
              value={formState.student}
              onChange={handleStudentChange}
              required
              isInvalid={isValidated && !formState.student}
            >
              <option value=''>Select a Student</option>
              {students && students.map((option) => (
                <option value={option.displayName} key={option.id}>{option.displayName}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a student.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 px-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <DatePicker
              className='mx-3 px-3'
              selected={formState.date}
              onChange={handleDateChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 px-3" controlId="formStartTime">
            <Form.Label>Start Time</Form.Label>
            <DatePicker
              className='mx-3 px-3'
              selected={formState.startTime}
              onChange={handleStartTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Form.Group>
          <Form.Group className="mb-3 px-3" controlId="formEndTime">
            <Form.Label>End Time</Form.Label>
            <DatePicker
              className='mx-3 px-3'
              selected={formState.endTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3 px-3" controlId="formDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              as="select"
              value={formState.durationOption}
              onChange={handleDurationOptionChange}
              required
            >
              <option value="1h">1 hour</option>
              <option value="30m">30 minutes</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3 px-3" controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              type="text"
              name="comments"
              value={formState.comments}
              onChange={(e) => dispatch(setFormField({ field: 'comments', value: e.target.value }))}
            />
          </Form.Group>
          <Button
            className="mx-3"
            variant="success"
            type="submit"
            style={{ cursor: 'pointer' }}
          >
            {dateClick ? "Create Lesson" : "Edit Lesson"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LessonForm;