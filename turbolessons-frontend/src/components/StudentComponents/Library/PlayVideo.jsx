import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { 
    getVideoThunk,
    selectVideoUrls,
    selectLoading,
    selectError,
    clearVideoUrls 
} from './LibrarySlice';
import { setAccessToken } from '../../../service/axiosConfig';
import config from '../../../config';
import Loading from '../../../helpers/Loading';

const PlayVideo = ({ selected }) => {
    const dispatch = useDispatch();
    const videoRef = useRef();
    const { authState, oktaAuth } = useOktaAuth();
    
    const videoSrc = selected?.name ? `${config.resourceServer.videoUrl}/${selected.name}` : null;
    const videoUrls = useSelector(selectVideoUrls);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // Effect to fetch video URL
    useEffect(() => {
        const fetchVideo = async () => {
            if (authState?.isAuthenticated && videoSrc && !videoUrls[videoSrc]) {
                const accessToken = await oktaAuth.getAccessToken();
                setAccessToken(accessToken);
                dispatch(getVideoThunk(videoSrc));
            }
        };

        fetchVideo();
        
        // Clean up function to revoke object URLs when component unmounts
        return () => {
            if (videoSrc) {
                dispatch(clearVideoUrls());
            }
        };
    }, [authState?.isAuthenticated, videoSrc, dispatch, oktaAuth]);

    // Effect to update video source
    useEffect(() => {
        if (videoRef.current && videoUrls[videoSrc]) {
            videoRef.current.src = videoUrls[videoSrc];
            videoRef.current.load(); // Ensure video is reloaded with new source
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.src = ''; // Clear source on cleanup
            }
        };
    }, [videoUrls, videoSrc]);

    if (!selected?.name) {
        return null;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error loading video: {error}
            </div>
        );
    }

    return (
        <video 
            ref={videoRef} 
            controls 
            style={{ width: "100%", height: "auto" }}
            playsInline // Better mobile support
        />
    );
};

export default PlayVideo;
