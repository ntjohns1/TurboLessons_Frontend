import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LibraryPreview = () => {
  // Dummy data for videos
  const dummyVideos = [
    {
      id: 1,
      name: 'Introduction to Piano',
      thumbnailUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      duration: 1845 // 30:45 in seconds
    },
    {
      id: 2,
      name: 'Basic Guitar Chords',
      thumbnailUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      duration: 1230 // 20:30 in seconds
    },
    {
      id: 3,
      name: 'Vocal Warm-up Exercises',
      thumbnailUrl: null, // Example with no thumbnail
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
                      background: '#f0f0f0',
                      backgroundImage: video.thumbnailUrl ? `url(${video.thumbnailUrl})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!video.thumbnailUrl && (
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <i className="bi bi-film" style={{ fontSize: '2rem' }}></i>
                      </div>
                    )}
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