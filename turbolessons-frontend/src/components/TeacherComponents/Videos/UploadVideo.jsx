import React, { useState } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { uploadVideo } from '../../../service/videoService';
import { setAccessToken } from '../../../service/axiosConfig';
import config from '../../../config';


export default function Uploadvideo() {

    const { authState, oktaAuth } = useOktaAuth();

    const [formState, setFormState] = useState()

    const handleChange = (event) => {
        setFormState(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            await uploadVideo(formState);
            alert("Successfully Uploaded Video");
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <Container>
            <Card className='d-flex justify-content-center'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select a Video to Upload</Form.Label>
                        <Form.Control
                            type="file"
                            name="fileData"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button
                        className="mx-3"
                        variant="success"
                        type="submit"
                        style={{ cursor: 'pointer' }}
                    >
                        Upload Video
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}