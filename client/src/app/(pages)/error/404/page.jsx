"use client"
import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { SearchOff, Home, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const NotFound404 = () => {
   const navigate = useRouter();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 3
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 6,
            textAlign: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            maxWidth: 500,
            width: '100%'
          }}
        >
          <SearchOff sx={{ fontSize: 80, color: '#1976d2', mb: 2 }} />
          
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            404
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#666', mb: 2 }}>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" sx={{ color: '#888', mb: 4, lineHeight: 1.6 }}>
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => {navigate.back(); navigate.back()}}
              startIcon={<ArrowBack />}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              Go Back
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate.push('/')}
              startIcon={<Home />}
              sx={{ borderColor: '#333', color: '#333' }}
            >
              Return Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound404;