import React, { useEffect, useState } from 'react';
import { Card, Toast } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';

export default function SelectVideo({ setSelected }) {

    const { authState, oktaAuth } = useOktaAuth();

    const [videos, setVideos] = useState([]);


    const handleClickVideo = (video) => {
        setSelected(video)
    }

    useEffect(() => {
        const url = "http://localhost:8080/api/video";
        const accessToken = oktaAuth.getAccessToken();

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    return response.json();
                }
                return Promise.reject('Didn\'t receive expected status: 201');
            })
            .then((data) => {
                console.log("Response Data:", JSON.stringify(data));
                setVideos(data);
            })
            .catch((errorResponse) => {
                console.error('Error:', errorResponse);
                errorResponse.text().then((text) => {
                    console.error('Error Body:', text);
                });
            });
    }, []);

    return (
        <Card>
            <Card.Header>
                <h4>Select A Video</h4>
            </Card.Header>
            <Card.Body>
                {videos && videos.map((video) => (
                    <Toast onClick={() => handleClickVideo(video)} key={video.id}>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">{video.name}</strong>
                        </Toast.Header>
                    </Toast>
                ))}
            </Card.Body>
        </Card>
    );

}
