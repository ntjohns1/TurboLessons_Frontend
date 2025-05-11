import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../../../util/icons/default_thumbnail_blue.png';

const LibraryPreview = () => {
  // Dummy data for videos
  const dummyVideos = [
    {
      id: 1,
      name: 'Introduction to Piano',
      duration: 1845 // 30:45 in seconds
    },
    {
      id: 2,
      name: 'Basic Guitar Chords',
      duration: 1230 // 20:30 in seconds
    },
    {
      id: 3,
      name: 'Vocal Warm-up Exercises',
      duration: 900 // 15:00 in seconds
    }
  ];

  // Only show the first 3 videos in the preview
  const previewVideos = dummyVideos.slice(0, 3);

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
        {previewVideos.length === 0 ? (
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
                      src={defaultThumbnail} 
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