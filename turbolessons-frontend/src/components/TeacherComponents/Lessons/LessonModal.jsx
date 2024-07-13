import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonView from './LessonView';
// import LessonView from "./LessonView"


const LessonModal = ({ show, onHide, event, onSave }) => {
    const isReadOnly = event && event.id;
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isReadOnly ? 'View Lesson' : 'Edit Lesson'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LessonForm event={event} isReadOnly={isReadOnly} onHide={onHide} onSave={onSave} />
            </Modal.Body>
        </Modal>
    );
};

export default LessonModal;
