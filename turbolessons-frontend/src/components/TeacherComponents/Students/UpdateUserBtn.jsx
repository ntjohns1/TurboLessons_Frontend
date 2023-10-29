import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function UpdateUserBtn({ formState }) {
    const [setDisplayError] = useState(null);
    const handleUpdate = async (e) => {
        e.preventDefault();
        setDisplayError(null);
        // destructure state
        try {
            console.log(formState);
            alert("This didn't actually do anything yet.");
        }
        catch (err) {
            window.location.reload();
            return setDisplayError(`${err}`);
        }
    };
    return (
        <Button
            className='btn-info'
            onClick={handleUpdate}
        >
            Update
        </Button>
    )
}