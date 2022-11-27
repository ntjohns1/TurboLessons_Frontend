import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";

export default function AddMessage({ studentId, setStudentId }) {

    const [messageText, setMessageText] = useState('');

    // TODO: Use Effect for getting all students & function addMessage

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addMessage({
                variables: {
                    _id: studentId,
                    messageText: messageText
                },
            });
        } catch (e) {
            console.error(e);
            alert('Something Went Wrong')
        }
        setMessageText('');
    }


    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group id="addMessage">
                <Form.Label></Form.Label>
                <Form.Control
                    as="textarea"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    style={{ height: '100px' }}
                />
            </Form.Group>
            <Button
                as='input'
                className='my-2'
                type='submit'
            />
        </Form>
    )
}

