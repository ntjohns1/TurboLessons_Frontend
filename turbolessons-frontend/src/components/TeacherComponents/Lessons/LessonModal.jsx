import React from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonView from './LessonView';
import { useSelector } from 'react-redux';


const LessonModal = ({ show, onHide, onCreate, onUpdate, onDelete }) => {
    const isUpdate = useSelector((state) => state.lessons.isUpdate);
    const isDateClick = useSelector((state) => state.lessons.dateClick);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isDateClick ? 'Create Lesson' : 'Update Lesson'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isUpdate || isDateClick ? (
                    <LessonForm
                        onHide={onHide}
                        onCreate={onCreate}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ) : (
                    <LessonView
                        onHide={onHide}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default LessonModal;
