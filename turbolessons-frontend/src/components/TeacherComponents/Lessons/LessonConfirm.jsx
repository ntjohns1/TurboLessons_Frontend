import React, { useState } from "react";
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

export default function LessonConfirm({ show, onHide, onDelete }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
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
                        onClick={() => onDelete()}
                        variant="danger"
                    >
                        Delete Lesson
                    </Button>
                </ButtonGroup>
            </Modal.Body>
        </Modal>
    )
}