import React, { useEffect } from 'react';
import { Card, Toast } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchVideosThunk, 
    setCurrentVideo,
    selectVideos,
    selectLoading,
    selectError 
} from './VideoSlice';
import { setAccessToken } from '../../../service/axiosConfig';
import Loading from '../../../helpers/Loading';

export default function SelectVideo({ setSelected }) {
    const dispatch = useDispatch();
    const { authState, oktaAuth } = useOktaAuth();
    
    // Redux selectors
    const videos = useSelector(selectVideos);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        if (authState?.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchVideosThunk());
        }
    }, [authState, oktaAuth, dispatch]);

    const handleClickVideo = (video) => {
        dispatch(setCurrentVideo(video));
        setSelected(video);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error loading videos: {error}
            </div>
        );
    }

    return (
        <Card>
            <Card.Header>
                <h4>Select A Video</h4>
            </Card.Header>
            <Card.Body>
                {videos.length === 0 ? (
                    <p className="text-center">No videos available</p>
                ) : (
                    videos.map((video) => (
                        <Toast 
                            onClick={() => handleClickVideo(video)} 
                            key={video.id}
                            role="button"
                            className="video-toast"
                        >
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">{video.name}</strong>
                            </Toast.Header>
                        </Toast>
                    ))
                )}
            </Card.Body>
        </Card>
    );
}
