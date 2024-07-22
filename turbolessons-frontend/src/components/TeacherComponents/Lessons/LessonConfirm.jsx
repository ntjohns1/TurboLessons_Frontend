import React, { useState } from "react";
import { useOktaAuth } from '@okta/okta-react';
import { deleteLessonEvent } from '../../../service/eventService';
import { setAccessToken } from '../../../service/axiosConfig';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

export default function LessonConfirm({  show, onHide, eventId }) {

    const {authState, oktaAuth}= useOktaAuth();
    const handleDelete = async (event) => {
        try {
            const accessToken = await oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            await deleteLessonEvent(event);
            onHide()
            alert('Lesson Deleted');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Lesson?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ButtonGroup>
                    <Button
                        onClick={() => onHide()}
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