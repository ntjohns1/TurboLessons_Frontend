import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonView from './LessonView';
import { useSelector } from 'react-redux';


const LessonModal = ({ show, onHide, onCreate, onUpdate, onDelete }) => {
    const [isUpdate, setUpdate] = useState(false);
    const isDateClick = useSelector((state) => state.lessons.dateClick);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isDateClick ? 'Create Lesson' : 'Update Lesson'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isUpdate || isDateClick ? (
                    <LessonForm
                        setUpdate={setUpdate}
                        onHide={onHide}
                        onCreate={onCreate}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ) : (
                    <LessonView
                        setUpdate={setUpdate}
                        onHide={onHide}
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default LessonModal;
