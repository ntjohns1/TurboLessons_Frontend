import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonList from './LessonList';


const LessonModal = ({ show, onHide, event }) => {
    const isEditMode = event && event.id;
    useEffect(() => {
        console.log(event);
    }, [event])
    
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Edit Lesson' : 'Add Lesson'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isEditMode ? <LessonForm event={event} /> : <LessonList event={event} />}
            </Modal.Body>
        </Modal>
    );
};

export default LessonModal;
