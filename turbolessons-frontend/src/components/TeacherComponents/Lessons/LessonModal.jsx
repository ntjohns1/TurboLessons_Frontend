import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
// import LessonView from "./LessonView"


const LessonModal = ({ show, onHide, event }) => {
    const isReadOnly = event && event.id;
    return (
    //   <Modal show={show} onHide={onHide}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Add Lesson</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <LessonForm event={event} />
    //     </Modal.Body>
    //   </Modal>
    <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{isReadOnly ? 'Edit Lesson' : 'Lessons'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {isReadOnly ? (
        <LessonForm event={event} />
      ) : (
        <LessonForm event={event} />
      )}
    </Modal.Body>
  </Modal>
    );
  };
  
  export default LessonModal;
