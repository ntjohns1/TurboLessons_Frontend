import React from "react";
import { useOktaAuth } from '@okta/okta-react';
import { deleteLessonEvent } from '../../../service/eventService';
import { setAccessToken } from '../../../service/axiosConfig';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setShowConfirm, setShowModal } from './LessonSlice';

export default function LessonConfirm({  eventId }) {

    const dispatch = useDispatch();
    const showConfirm = useSelector((state) => state.lessons.showConfirm);
    const handleCloseConfirm = () => dispatch(setShowConfirm(false));
    const handleCloseModal = () => dispatch(setShowModal(false))
    const {oktaAuth}= useOktaAuth();
    const handleDelete = async (event) => {
        try {
            const accessToken = await oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            await deleteLessonEvent(event);
            handleCloseConfirm()
            handleCloseModal();
            alert('Lesson Deleted');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={showConfirm}
            onHide={handleCloseConfirm}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Lesson?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ButtonGroup>
                    <Button
                        onClick={() => handleCloseConfirm()}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleDelete(eventId)}
                        variant="danger"
                    >
                        Delete Lesson
                    </Button>
                </ButtonGroup>
            </Modal.Body>
        </Modal>
    )
}