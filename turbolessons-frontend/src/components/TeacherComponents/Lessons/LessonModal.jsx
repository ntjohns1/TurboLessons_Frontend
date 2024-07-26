import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonView from './LessonView';
// import LessonView from "./LessonView"


const LessonModal = ({ show, onHide, event, onSave, isDateClick }) => {
    const [isUpdate, setUpdate] = useState(false);
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isDateClick ? 'Create Lesson' : 'Update Lesson'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isUpdate || isDateClick ? (
                    <LessonForm event={event} setUpdate={setUpdate} onHide={onHide} onSave={onSave} isDateClick={isDateClick} />
                ) : (
                    <LessonView event={event} setUpdate={setUpdate} onHide={onHide} onSave={onSave} />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default LessonModal;
