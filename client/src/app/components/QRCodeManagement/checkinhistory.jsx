import React from 'react';
import { Box, Paper, Typography, Stack, Avatar } from '@mui/material';
import { MdLogin, MdLogout } from 'react-icons/md';

const InsOuts = ({ logs }) => {
  const lastLogs = logs.slice(-4).reverse(); // last 4 logs

  return (
    <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Today's Check-ins/Check-outs
      </Typography>
      <Stack spacing={1}>
        {lastLogs.map((log, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                bgcolor: log.type === 'in' ? 'success.lighter' : 'error.lighter',
                color: log.type === 'in' ? 'success.main' : 'error.main',
                width: 32,
                height: 32,
              }}
            >
              {log.type === 'in' ? <MdLogin size={20} /> : <MdLogout size={20} />}
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.primary">
                <strong>{log.user}</strong> {log.type === 'in' ? 'checked in' : 'checked out'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {log.session} - {log.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default InsOuts;