import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

export default function DeletUserBtn({ oktaAuth, id, setIsUpdate }) {
    const [show, setShow] = useState(false);
    const handleDelete = async (e) => {
        // e.preventDefault();
        const accessToken = oktaAuth.getAccessToken();
        try {
            fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(() => alert(`Student Deleted`))
                .then(() => setIsUpdate(false))
                .catch(error => console.log(error));
        }
        catch (err) {
            return console.error(err);
        }
    };
    return (
        <>
            <Alert show={show} variant="danger">
                <Alert.Heading>Are You Sure??</Alert.Heading>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => handleDelete()} variant="outline-danger">
                        Confirm
                    </Button>
                    <Button onClick={() => setShow(false)} variant="outline-danger">
                        Cancel
                    </Button>
                </div>
            </Alert>

            {!show && <Button onClick={() => setShow(true)} variant="danger">Delete Student</Button>}
        </>
    )
}