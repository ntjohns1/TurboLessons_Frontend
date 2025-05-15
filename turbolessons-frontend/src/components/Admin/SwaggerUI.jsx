import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import config from '../../config';

/**
 * SwaggerUI component that embeds the Swagger UI from the payment service
 * within an iframe in the frontend application.
 */
const SwaggerUI = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the API gateway URL with the direct path to Swagger UI
  const swaggerUrl = `${config.resourceServer.baseUrl}/api/payments/swagger-ui.html`;
  
  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError('Failed to load Swagger UI. Please ensure the payment service is running.');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payment Service API Documentation
      </Typography>
      <Typography variant="body1" paragraph>
        This page provides interactive documentation for the TurboLessons Payment Service API.
      </Typography>
      
      <Paper elevation={3} sx={{ mt: 2, height: 'calc(100vh - 200px)', position: 'relative' }}>
        {loading && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 1
            }}
          >
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Box 
            sx={{ 
              p: 3, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        
        <iframe 
          src={swaggerUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Payment Service API Documentation"
        />
      </Paper>
    </Box>
  );
};

export default SwaggerUI;
