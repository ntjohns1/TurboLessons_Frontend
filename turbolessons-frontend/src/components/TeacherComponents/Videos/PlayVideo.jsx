import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { getVideo } from '../../../service/videoService';
import { setAccessToken } from '../../../service/axiosConfig';
import config from '../../../config';

const PlayVideo = ({ selected }) => {
    const videoRef = useRef();
    const videoSrc = `${config.resourceServer.videoUrl}/${selected.name}`;
    const { authState, oktaAuth } = useOktaAuth();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const accessToken = oktaAuth.getAccessToken();
                setAccessToken(accessToken);
                const url = await getVideo(videoSrc);
                videoRef.current.src = url;
            } catch (error) {
                console.error(error);
            }
        }

        fetchVideo()
    }, [authState, videoSrc]);

    return <video ref={videoRef} controls style={{ width: "100%", height: "auto" }} />;
};

export default PlayVideo;
