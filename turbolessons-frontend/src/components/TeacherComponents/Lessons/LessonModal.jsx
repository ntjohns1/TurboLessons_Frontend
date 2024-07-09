import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonList from './LessonList';


const LessonModal = ({ show, onHide, event }) => {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LessonForm event={event} />
        </Modal.Body>
      </Modal>
    );
  };
  
  export default LessonModal;
