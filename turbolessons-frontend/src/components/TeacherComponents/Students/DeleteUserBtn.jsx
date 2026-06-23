import React, { useState } from 'react';
import { Button, Modal, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDeleteStudentMutation } from './studentsApi';

export default function DeleteUserBtn({ id, student }) {
    const navigate = useNavigate();
    const [deleteStudent] = useDeleteStudentMutation();
    const [valid, setValid] = useState(false);
    const [inputTxt, setInputTxt] = useState({ inputTxt: '' });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const studentName = student.firstName + " " + student.lastName;

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (value === studentName) {
            setValid(true);
        }
        setInputTxt({ ...inputTxt, [name]: value });
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            // Tag invalidation refetches the roster, so the deleted student
            // drops out of the list automatically.
            await deleteStudent(id).unwrap();
            alert(`${studentName} Deleted`);
            navigate('/teacher_portal/students');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Button onClick={handleShow} variant="danger">Delete Student</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaininputTxtEmail">
                            <Form.Label>
                                Retype the Users's First and Last Name to Continue: {studentName}
                            </Form.Label>
                            <Form.Control
                                name="inputTxt"
                                onChange={handleChange}
                                value={inputTxt.inputTxt}
                                type="text"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-end">
                    <Button onClick={handleDelete} variant="outline-danger" disabled={!valid}>
                        Confirm
                    </Button>
                    <Button onClick={handleClose} variant="outline-danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
