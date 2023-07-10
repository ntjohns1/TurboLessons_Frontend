import React, { useState } from 'react';
import { Button, Modal, Form, Row } from 'react-bootstrap';
import config from '../../config';

export default function DeletUserBtn({ oktaAuth, id, student }) {
    const [valid, setValid] = useState(false);
    const [inputTxt, setInputTxt] = useState({
        inputTxt: ''
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const studentName = student.firstName + " " + student.lastName;
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (value === studentName) {
            setValid(true);
        }

        setInputTxt({
            ...inputTxt,
            [name]: value,
        });
    };


    const handleDelete = async (e) => {
        // e.preventDefault();
        const accessToken = oktaAuth.getAccessToken();
        try {
            fetch(`${config.resourceServer.userAdminUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(() => alert(`${studentName} Deleted`))
                .then(() => goBack())
                .catch(error => console.log(error));
        }
        catch (err) {
            return console.error(err);
        }
    };


    function goBack() {
        document.location.replace(`/students`);
    }
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
                            <Form.Label >
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
                    <Button onClick={() => handleDelete()} variant="outline-danger" disabled={!valid}>
                        Confirm
                    </Button>
                    <Button onClick={handleClose} variant="outline-danger">
                        Cancel
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}