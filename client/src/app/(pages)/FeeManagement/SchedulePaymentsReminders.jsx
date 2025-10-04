"use client"

import React, { useState } from 'react';
import { Container, Grid, Card, Typography, Box, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Tabs, Tab, IconButton, Tooltip } from '@mui/material';
import { Payment, Notifications, CalendarToday, Edit, Delete } from '@mui/icons-material';
import Calendar from '../../components/Calendar/Calendar';
import { format, isAfter, isBefore, isToday } from 'date-fns';

const SchedulePaymentsReminders = () => {
  const [scheduledItems, setScheduledItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('all');
  const [activeTab, setActiveTab] = useState(0);

  const handleDatesChange = (selectedDates) => {
    setScheduledItems(selectedDates);
  };

  const handleAddDetails = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleRemoveItem = (itemToRemove) => {
    setScheduledItems(prev => 
      prev.filter(item => !(item.date === itemToRemove.date && item.type === itemToRemove.type))
    );
  };

  const handleSaveDetails = () => {
    if (selectedItem) {
      setScheduledItems(prev =>
        prev.map(item =>
          item.date === selectedItem.date && item.type === selectedItem.type
            ? { ...item, ...selectedItem }
            : item
        )
      );
      setOpenDialog(false);
      setSelectedItem(null);
    }
  };

  const filteredItems = scheduledItems.filter(item => {
    const now = new Date();
    switch (view) {
      case 'upcoming': return isAfter(item.date, now) || isToday(item.date);
      case 'past': return isBefore(item.date, now) && !isToday(item.date);
      default: return true;
    }
  });

  const typeConfigs = {
    payment: { color: '#d32f2f', icon: Payment },
    reminder: { color: '#1976d2', icon: Notifications },
    holiday: { color: '#f57c00', icon: CalendarToday },
    event: { color: '#388e3c', icon: CalendarToday }
  };

  const getItemsByType = () => {
    const types = ['payment', 'reminder', 'holiday', 'event'];
    return filteredItems.filter(item => item.type === types[activeTab]);
  };

  const currentItems = getItemsByType();
  const currentType = ['payment', 'reminder', 'event'][activeTab];

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Calendar - Wider Column */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ p: 3, minHeight: 600 }}>
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              '& .MuiPaper-root': { 
                maxWidth: '100% !important',
                width: '100% !important'
              }
            }}>
              <Calendar 
                onDatesChange={handleDatesChange} 
                showSelectedSummary={true}
                sx={{ width: '100%' }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Schedule List - Smaller Column */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ p: 2, minHeight: 600 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Scheduled Items</Typography>
                <Chip label={filteredItems.length} color="primary" variant="outlined" />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                {['all', 'upcoming', 'past'].map((v) => (
                  <Button
                    key={v}
                    variant={view === v ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setView(v)}
                    sx={{ textTransform: 'none' }}
                  >
                    {v}
                  </Button>
                ))}
              </Box>

              <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
                <Tab label="Payments" sx={{ textTransform: 'none' }} />
                <Tab label="Reminders" sx={{ textTransform: 'none' }} />
                <Tab label="Events" sx={{ textTransform: 'none' }} />
              </Tabs>
            </Box>

            <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
              {currentItems.length === 0 ? (
                <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                  No {currentType} scheduled
                </Typography>
              ) : (
                currentItems.map((item, index) => {
                  const config = typeConfigs[item.type];
                  const Icon = config.icon;
                  
                  return (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 1,
                        border: 1,
                        borderColor: config.color + '30',
                        borderRadius: 1,
                        bgcolor: config.color + '08',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Icon sx={{ color: config.color }} />
                        <Box>
                          <Typography fontWeight="600">
                            {format(item.date, 'MMM dd, yyyy')}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.label || item.type}
                          </Typography>
                          {item.amount && (
                            <Chip label={`$${item.amount}`} size="small" sx={{ bgcolor: config.color, color: 'white', mt: 0.5 }} />
                          )}
                        </Box>
                      </Box>
                      
                      <Box>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleAddDetails(item)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => handleRemoveItem(item)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit {selectedItem?.type === 'payment' ? 'Payment' : 'Reminder'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Date: {selectedItem && format(selectedItem.date, 'MMMM dd, yyyy')}
          </Typography>
          
          <TextField
            fullWidth
            label="Description"
            value={selectedItem?.label || ''}
            onChange={(e) => setSelectedItem(prev => ({ ...prev, label: e.target.value }))}
            margin="normal"
          />

          {selectedItem?.type === 'payment' && (
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={selectedItem?.amount || ''}
              onChange={(e) => setSelectedItem(prev => ({ ...prev, amount: e.target.value }))}
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveDetails} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SchedulePaymentsReminders;