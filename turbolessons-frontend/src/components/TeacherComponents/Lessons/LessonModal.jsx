import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import LessonForm from './LessonForm';
import LessonList from './LessonList';


export default function LessonModal({ showModal, handleCloseModal, selectInfo }) {

    return (
        <Modal
            show={showModal}
            onHide={handleCloseModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>New Lesson</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <LessonForm selectInfo={selectInfo}/> */}
                <LessonList />
            </Modal.Body>
        </Modal>
    )
}
