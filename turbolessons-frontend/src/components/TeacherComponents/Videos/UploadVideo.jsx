import React, { useState } from 'react';
import { Button, Card, Container, Form, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { 
    uploadVideoThunk,
    selectUploadProgress,
    selectUploadStatus,
    selectError,
    resetUploadStatus
} from './VideoSlice';
import { setAccessToken } from '../../../service/axiosConfig';

export default function UploadVideo() {
    const dispatch = useDispatch();
    const { oktaAuth } = useOktaAuth();
    const [file, setFile] = useState(null);
    
    const uploadProgress = useSelector(selectUploadProgress);
    const uploadStatus = useSelector(selectUploadStatus);
    const error = useSelector(selectError);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        // Reset any previous upload status when a new file is selected
        dispatch(resetUploadStatus());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        try {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            await dispatch(uploadVideoThunk(file)).unwrap();
            setFile(null); // Clear the file input
            alert("Successfully Uploaded Video");
        } catch (err) {
            console.error('Error uploading video:', err);
        }
    };

    const getProgressVariant = () => {
        switch (uploadStatus) {
            case 'success':
                return 'success';
            case 'error':
                return 'danger';
            default:
                return 'info';
        }
    };

    return (
        <Container>
            <Card className='p-4'>
                <Card.Title>Upload Video</Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select a Video to Upload</Form.Label>
                            <Form.Control
                                type="file"
                                name="fileData"
                                onChange={handleChange}
                                accept="video/*"
                            />
                            <Form.Text className="text-muted">
                                Supported formats: MP4, WebM, Ogg
                            </Form.Text>
                        </Form.Group>

                        {uploadStatus !== 'idle' && (
                            <div className="mb-3">
                                <ProgressBar
                                    now={uploadProgress}
                                    variant={getProgressVariant()}
                                    label={`${uploadProgress}%`}
                                />
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                Error uploading video: {error}
                            </div>
                        )}

                        <Button
                            className="w-100"
                            variant="primary"
                            type="submit"
                            disabled={!file || uploadStatus === 'uploading'}
                        >
                            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Video'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}