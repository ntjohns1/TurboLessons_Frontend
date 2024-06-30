import React, { useEffect, useState } from 'react';
import { Card, Toast } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { fetchVideos } from '../../../service/videoService';
import { setAccessToken } from '../../../service/axiosConfig';
import config from '../../../config';

export default function SelectVideo({ setSelected }) {

    const { authState, oktaAuth } = useOktaAuth();

    const [videos, setVideos] = useState([]);


    const handleClickVideo = (video) => {
        setSelected(video)
    }

    useEffect(() => {
        const getVideos = async () => {
            try {
                if (authState && authState.isAuthenticated) {
                    const accessToken = await oktaAuth.getAccessToken();
                    setAccessToken(accessToken);
                    const data = await fetchVideos();
                    setVideos(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        
        getVideos();
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
