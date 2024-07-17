import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonView from './LessonView';
// import LessonView from "./LessonView"


const LessonModal = ({ show, onHide, event, onSave, onDelete }) => {
    // const isReadOnly = event && event.id;
    const [isUpdate, setUpdate] = useState(false);
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? 'Edit Lesson' : 'View Lesson'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isUpdate ? (
                    <LessonForm event={event} setUpdate={setUpdate} onHide={onHide} onSave={onSave} />
                ) : (
                    <LessonView event={event} setUpdate={setUpdate} onHide={onHide} onDelete={onDelete} />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default LessonModal;
