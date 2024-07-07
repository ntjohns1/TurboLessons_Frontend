import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createLesson, editLesson, deleteLesson } from '../../../service/eventService';
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../../service/axiosConfig';

const LessonModal = ({ modalInfo, setModalInfo }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const [formState, setFormState] = useState({
    title: '',
    date: '',
    time: '',
    student: ''
  });

  useEffect(() => {
    if (modalInfo && modalInfo.id) {
      setFormState({
        title: modalInfo.title,
        date: modalInfo.date,
        time: modalInfo.time,
        student: modalInfo.student
      });
    } else {
      setFormState({
        title: '',
        date: modalInfo.start,
        time: '12:00', // Default time
        student: ''
      });
    }
  }, [modalInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (authState && authState.isAuthenticated) {
        const accessToken = await oktaAuth.getAccessToken();
        setAccessToken(accessToken);
        if (modalInfo.id) {
          await editLesson(modalInfo.id, formState);
          alert('Lesson updated successfully');
        } else {
          await createLesson(formState);
          alert('Lesson created successfully');
        }
        setModalInfo(null);
      }
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const accessToken = await oktaAuth.getAccessToken();
        setAccessToken(accessToken);
        await deleteLesson(modalInfo.id);
        alert('Lesson deleted successfully');
        setModalInfo(null);
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  return (
    <Modal show onHide={() => setModalInfo(null)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalInfo.id ? 'Edit Lesson' : 'Create Lesson'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="time">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formState.time}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="student">
            <Form.Label>Student</Form.Label>
            <Form.Control
              type="text"
              name="student"
              value={formState.student}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">{modalInfo.id ? 'Save Changes' : 'Create Lesson'}</Button>
          {modalInfo.id && <Button variant="danger" onClick={handleDelete}>Delete Lesson</Button>}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LessonModal;