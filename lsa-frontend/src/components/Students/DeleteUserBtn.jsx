import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function DeletUserBtn({ formState }) {
    const [setDisplayError] = useState(null);
    const handleDelete = async (e) => {
        e.preventDefault();
        setDisplayError(null);
        // destructure state
        try {
            alert("This button doesn't do anything yet");
        }
        catch (err) {
            return setDisplayError(`${err}`);
        }
    };
    return (
        <Button
            className='btn-danger'
            onClick={handleDelete}
        >
            Delete
        </Button>
    )
}