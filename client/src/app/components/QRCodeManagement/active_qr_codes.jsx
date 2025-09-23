import React from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';

const ActiveQR = ({ sessions }) => {
  return (
    <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Active QR Code Sessions
      </Typography>
      <Stack spacing={1}>
        {sessions.map((session, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1.5,
              borderRadius: 1,
              border: 1,
              borderColor: session.active ? 'success.light' : 'grey.300',
              bgcolor: session.active ? 'success.lighter' : 'grey.100',
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {session.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {session.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: session.active ? 'success.main' : 'grey.500',
                  animation: session.active ? 'pulse 2s infinite' : 'none',
                }}
              />
              <Typography variant="caption" color={session.active ? 'success.main' : 'text.secondary'}>
                {session.active ? 'Active' : 'Inactive'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default ActiveQR;