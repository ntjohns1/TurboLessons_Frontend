import React, { useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { 
  fetchVideosThunk,
  selectVideos,
  selectLoading,
  selectError 
} from '../Library/LibrarySlice';
import { setAccessToken } from '../../../service/axiosConfig';
// Instead of importing the image directly, we'll use the public path
// This is more robust and will work in both local and CI environments
const LibraryPreview = () => {
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

  // Only show the first 3 videos in the preview
  const previewVideos = videos.slice(0, 3);

  // Styles for equal height
  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const cardBodyStyle = {
    flex: '1 1 auto' // Makes the card body expand to fill available space
  };

  return (
    <Card style={cardStyle}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Your Library</h5>
        <Link to="/student/library">
          <Button variant="outline-primary" size="sm">View All</Button>
        </Link>
      </Card.Header>
      <Card.Body style={cardBodyStyle}>
        {loading ? (
          <p className="text-center">Loading your library...</p>
        ) : error ? (
          <p className="text-center text-danger">Error loading content: {error}</p>
        ) : previewVideos.length === 0 ? (
          <p className="text-center">No content available in your library</p>
        ) : (
          <Row>
            {previewVideos.map((video) => (
              <Col md={4} key={video.id} className="mb-3">
                <Card className="h-100">
                  <div 
                    className="video-thumbnail" 
                    style={{ 
                      height: '120px', 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    <img 
                      src="/assets/images/default_thumbnail_blue.png" 
                      alt="Video thumbnail" 
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }} 
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="h6">{video.name}</Card.Title>
                    <small className="text-muted">
                      {video.duration ? `${Math.floor(video.duration / 60)}:${String(video.duration % 60).padStart(2, '0')}` : 'Duration unknown'}
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default LibraryPreview;