"use client";

import React, { useState, useEffect } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isSameDay, addDays, isWithinInterval } from "date-fns";
import {
  Box,
  Chip,
  Typography,
  Paper,
  Alert,
  Tooltip,
  Button,
  ButtonGroup,
  TextField,
  Grid,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import {
  Event as EventIcon,
  BeachAccess as HolidayIcon,
  Payment as PaymentIcon,
  Notifications as ReminderIcon,
  ClearAll,
  Cancel,
} from "@mui/icons-material";

const Calendar = ({
  initialSelectedDates = [],
  onDatesChange,
  showSelectedSummary = true,
  selectionMode: externalSelectionMode = "multiple",
  dateType: externalDateType = "payment",
}) => {
  const [selectedDates, setSelectedDates] = useState(initialSelectedDates);
  const [selectionMode, setSelectionMode] = useState(externalSelectionMode);
  const [currentDateType, setCurrentDateType] = useState(externalDateType);
  const [dateLabel, setDateLabel] = useState("");
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const dateTypes = {
    payment: { label: "Payment", color: "#d32f2f", lightColor: "#ffcdd2", icon: <PaymentIcon /> },
    reminder: { label: "Reminder", color: "#1976d2", lightColor: "#bbdefb", icon: <ReminderIcon /> },
    holiday: { label: "Holiday", color: "#f57c00", lightColor: "#ffe0b2", icon: <HolidayIcon /> },
    event: { label: "Event", color: "#388e3c", lightColor: "#c8e6c9", icon: <EventIcon /> },
  };

  const isDateSelected = (date) => selectedDates.some((item) => isSameDay(item.date, date));
  const getDateType = (date) => selectedDates.find((item) => isSameDay(item.date, date))?.type;

  const handleDateSelect = (date) => {
    if (selectionMode === "range") {
      if (!rangeStart) {
        setRangeStart(date);
        return;
      }
      setRangeEnd(date);
      handleRangeConfirm(date);
      return;
    }

    if (selectionMode === "multiple") {
      if (isDateSelected(date)) {
        setSelectedDates((prev) => prev.filter((item) => !isSameDay(item.date, date)));
      } else {
        const newDate = { date, type: currentDateType, label: dateLabel || dateTypes[currentDateType].label };
        setSelectedDates((prev) => [...prev, newDate]);
      }
    } else {
      const newDate = { date, type: currentDateType, label: dateLabel || dateTypes[currentDateType].label };
      setSelectedDates([newDate]);
    }
    setDateLabel("");
  };

  const handleRangeConfirm = (endDate) => {
    if (!rangeStart) return;
    const start = rangeStart;
    const end = endDate || rangeEnd;
    if (!end) return;

    const dateRange = [];
    let current = start;
    while (current <= end) {
      dateRange.push({
        date: new Date(current),
        type: currentDateType,
        label: dateLabel || `${format(start, "MMM dd")} - ${format(end, "MMM dd")}`,
      });
      current = addDays(current, 1);
    }

    setSelectedDates((prev) => [...prev, ...dateRange]);
    setRangeStart(null);
    setRangeEnd(null);
    setDateLabel("");
  };

  const handleClearAll = () => {
    setSelectedDates([]);
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates((prev) => prev.filter((item) => !isSameDay(item.date, dateToRemove)));
  };

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const date = day;
    const isSelected = isDateSelected(date);
    const dateType = getDateType(date);
    const isInRange = rangeStart && rangeEnd && isWithinInterval(date, { start: rangeStart, end: rangeEnd });
    const isRangeStart = rangeStart && isSameDay(date, rangeStart);
    const isRangeEnd = rangeEnd && isSameDay(date, rangeEnd);

    const bgColor = isRangeStart || isRangeEnd ? dateTypes[currentDateType].color 
                 : isInRange ? dateTypes[currentDateType].lightColor 
                 : isSelected && dateType ? dateTypes[dateType].color 
                 : "transparent";

    const textColor = isRangeStart || isRangeEnd || isSelected ? "white" 
                    : isInRange ? dateTypes[currentDateType].color 
                    : "text.primary";

    return (
      <Tooltip title={dateType ? `${dateTypes[dateType].label}` : "Click to schedule"} arrow>
        <Box
          onClick={() => handleDateSelect(date)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: isSelected || isRangeStart || isRangeEnd ? "bold" : "normal",
            backgroundColor: bgColor,
            color: textColor,
            border: isInRange ? `2px solid ${dateTypes[currentDateType].color}` : "none",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: isSelected ? dateTypes[dateType]?.color : dateTypes[currentDateType].lightColor,
              transform: "scale(1.1)",
            },
          }}
        >
          {format(date, "d")}
        </Box>
      </Tooltip>
    );
  };

  useEffect(() => {
    onDatesChange?.(selectedDates);
  }, [selectedDates]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ p: 2, width: '100%', maxWidth: 400 }}>
        {/* Header */}
        <Typography variant="h6" gutterBottom color="primary">
          Schedule Calendar
        </Typography>

        {/* Controls Row */}
        <Box sx={{ mb: 2 }}>
          <ButtonGroup fullWidth size="small" sx={{ mb: 1 }}>
            {["single", "multiple", "range"].map((mode) => (
              <Button
                key={mode}
                variant={selectionMode === mode ? "contained" : "outlined"}
                onClick={() => setSelectionMode(mode)}
                sx={{ textTransform: 'capitalize' }}
              >
                {mode}
              </Button>
            ))}
          </ButtonGroup>

          <Grid container spacing={1} sx={{ mb: 1 }}>
            {Object.entries(dateTypes).map(([key, config]) => (
              <Grid item xs={6} key={key}>
                <Button
                  fullWidth
                  variant={currentDateType === key ? "contained" : "outlined"}
                  startIcon={config.icon}
                  onClick={() => setCurrentDateType(key)}
                  size="small"
                  sx={{
                    bgcolor: currentDateType === key ? config.color : "transparent",
                    borderColor: config.color,
                    color: currentDateType === key ? "white" : config.color,
                    textTransform: 'none',
                    fontSize: '0.75rem',
                  }}
                >
                  {config.label}
                </Button>
              </Grid>
            ))}
          </Grid>

          <TextField
            fullWidth
            size="small"
            label="Description"
            value={dateLabel}
            onChange={(e) => setDateLabel(e.target.value)}
            placeholder="Add description"
            sx={{ mb: 1 }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" color="error" onClick={handleClearAll} size="small" startIcon={<ClearAll />}>
              Clear
            </Button>
            {selectionMode === "range" && rangeStart && (
              <Button variant="outlined" size="small" onClick={() => { setRangeStart(null); setRangeEnd(null); }} startIcon={<Cancel />}>
                Cancel
              </Button>
            )}
          </Box>
        </Box>

        {/* Range Info */}
        {selectionMode === "range" && rangeStart && (
          <Alert severity="info" sx={{ mb: 1, fontSize: '0.8rem' }}>
            {rangeEnd
              ? `${format(rangeStart, "MMM dd")} - ${format(rangeEnd, "MMM dd")}`
              : `Start: ${format(rangeStart, "MMM dd")}`}
          </Alert>
        )}

        {/* Calendar */}
        <DateCalendar
          showDaysOutsideCurrentMonth
          slots={{ day: CustomDay }}
          sx={{ 
            width: '100%',
            '& .MuiPickersCalendarHeader-root': { marginBottom: 1 },
            '& .MuiPickersCalendarHeader-label': { fontWeight: "600" },
          }}
        />

        {/* Selected Dates */}
        {showSelectedSummary && selectedDates.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected ({selectedDates.length})
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, maxHeight: 80, overflow: "auto" }}>
              {selectedDates.map((item, i) => (
                <Chip
                  key={i}
                  label={format(item.date, "MMM dd")}
                  size="small"
                  onDelete={() => handleRemoveDate(item.date)}
                  sx={{
                    backgroundColor: dateTypes[item.type].color,
                    color: "white",
                    fontSize: '0.7rem',
                    '& .MuiChip-deleteIcon': { color: "white", fontSize: '1rem' },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default Calendar;