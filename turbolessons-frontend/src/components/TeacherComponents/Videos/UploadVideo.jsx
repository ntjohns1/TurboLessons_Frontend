import React, { useState } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import config from '../../../config';


export default function Uploadvideo() {

    const { authState, oktaAuth } = useOktaAuth();

    const [formState, setFormState] = useState()

    const handleChange = (event) => {
        setFormState(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const accessToken = oktaAuth.getAccessToken();

        let formData = new FormData();
        formData.append('file', formState);

        console.log('File Data:', formData.get('file'));

        await fetch(config.resourceServer.videoUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    return response.text();
                }
                return Promise.reject('Didn\'t receive expected status: 201');
            })
            .then((responseData) => {
                console.log("Response Data:", JSON.stringify(responseData));
                alert('Successfully Uploaded Video');
            })
            .catch((errorResponse) => {
                console.error('Error:', errorResponse);
                errorResponse.text().then((text) => {
                    console.error('Error Body:', text);
                });
            });
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