"use client"
import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Lock, Home } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Unauthorized401 = () => {
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
          <Lock sx={{ fontSize: 80, color: '#ff6b35', mb: 2 }} />
          
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            401
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#666', mb: 2 }}>
            Unauthorized Access
          </Typography>
          
          <Typography variant="body1" sx={{ color: '#888', mb: 4, lineHeight: 1.6 }}>
            You need to be logged in to access this page. Please sign in with your credentials.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => navigate.push('/auth/login')}
              startIcon={<Lock />}
              sx={{
                backgroundColor: '#ff6b35',
                '&:hover': { backgroundColor: '#e55a2b' }
              }}
            >
              Sign In
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate.push('/')}
              startIcon={<Home />}
              sx={{ borderColor: '#333', color: '#333' }}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized401;