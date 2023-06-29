import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const PlayVideo = ({ selected }) => {
    const videoRef = useRef();
    const videoSrc = `http://localhost:8080/api/video/${selected.name}`;
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();

    useEffect(() => {
        if (!authState.isAuthenticated) {
            // If the user is not authenticated, do nothing
            return;
        }

        // Fetch video
        fetch(videoSrc, {
            
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                videoRef.current.src = url;
            })
            .catch((err) => console.error(err));
    }, [authState, videoSrc]);

    return <video ref={videoRef} controls style={{ width: "100%", height: "auto" }} />;
};

export default PlayVideo;
