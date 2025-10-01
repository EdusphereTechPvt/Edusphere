"use client"
import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Block, Home, Security } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Forbidden403 = () => {
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
          <Block sx={{ fontSize: 80, color: '#d32f2f', mb: 2 }} />
          
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            403
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#666', mb: 2 }}>
            Access Forbidden
          </Typography>
          
          <Typography variant="body1" sx={{ color: '#888', mb: 4, lineHeight: 1.6 }}>
            You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => {navigate.back(); navigate.back()}}
              startIcon={<Security />}
              sx={{
                backgroundColor: '#d32f2f',
                '&:hover': { backgroundColor: '#b71c1c' }
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
              Home Page
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Forbidden403;